import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  verifyPassword,
  signSessionToken,
  hashPassword,
  COOKIE_NAME,
  SYSTEM_PRESET_USERS,
} from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();
    let user = null;
    let isDbAvailable = true;

    try {
      user = await prisma.user.findUnique({
        where: { email: normalizedEmail },
      });
    } catch (dbErr) {
      console.warn("Database lookup failed, falling back to preset verification:", dbErr.message);
      isDbAvailable = false;
    }

    // 1. If user exists in DB, verify password hash
    if (user) {
      if (!user.active) {
        return NextResponse.json(
          { error: "Invalid credentials or account deactivated." },
          { status: 401 }
        );
      }

      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid credentials." },
          { status: 401 }
        );
      }
    } else {
      // 2. User not in database: check authorized system presets (supports Vercel with unseeded DB or serverless)
      const preset = SYSTEM_PRESET_USERS.find(
        (p) =>
          p.email.toLowerCase() === normalizedEmail ||
          (p.alternateEmail && p.alternateEmail.toLowerCase() === normalizedEmail)
      );

      if (!preset || preset.plainPassword !== password) {
        return NextResponse.json(
          { error: "Invalid credentials or account deactivated." },
          { status: 401 }
        );
      }

      // If DB is available, auto-create the preset user in the DB
      if (isDbAvailable) {
        try {
          const passwordHash = await hashPassword(password);
          user = await prisma.user.upsert({
            where: { email: preset.email },
            update: {
              passwordHash,
              role: preset.role,
              active: true,
            },
            create: {
              email: preset.email,
              name: preset.name,
              passwordHash,
              role: preset.role,
              title: preset.title,
              active: true,
            },
          });
        } catch (seedErr) {
          console.warn("Could not auto-persist preset user into database:", seedErr.message);
        }
      }

      // If user is still null (e.g. read-only serverless environment), use preset object
      if (!user) {
        user = {
          id: preset.id,
          email: preset.email,
          name: preset.name,
          role: preset.role,
          title: preset.title,
          active: true,
        };
      }
    }

    // Generate JWT token
    const token = await signSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      title: user.title,
    });

    // Record login audit log if DB is writable
    if (isDbAvailable) {
      try {
        await prisma.auditLog.create({
          data: {
            actorId: user.id,
            action: "USER_LOGIN",
            entityType: "AUTH",
            entityId: user.id,
            diff: JSON.stringify({ email: user.email, role: user.role }),
          },
        });
      } catch {}
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        title: user.title,
      },
    });

    // Set secure HTTP-only cookie
    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "An internal server error occurred during authentication." },
      { status: 500 }
    );
  }
}
