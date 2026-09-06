import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyPassword, signSessionToken, COOKIE_NAME } from "@/lib/auth";

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
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.active) {
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

    // Generate JWT token
    const token = await signSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    // Record login audit log
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
