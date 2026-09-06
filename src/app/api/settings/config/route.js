import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";

export async function GET() {
  try {
    const configs = await prisma.siteConfig.findMany({
      orderBy: { key: "asc" },
    });

    const configMap = configs.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return NextResponse.json({ success: true, configs, configMap });
  } catch (error) {
    console.error("Fetch site config error:", error);
    return NextResponse.json({ error: "Failed to fetch site configurations." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN])) {
      return NextResponse.json(
        { error: "Insufficient privileges to modify site configuration." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { configs = {} } = body;

    const updatedKeys = [];

    for (const [key, value] of Object.entries(configs)) {
      if (typeof key !== "string" || !key.trim()) continue;

      const stringVal = typeof value === "object" ? JSON.stringify(value) : String(value ?? "");

      await prisma.siteConfig.upsert({
        where: { key: key.trim().toUpperCase() },
        update: { value: stringVal },
        create: {
          key: key.trim().toUpperCase(),
          value: stringVal,
        },
      });
      updatedKeys.push(key.trim().toUpperCase());
    }

    // Write audit log
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "UPDATE_SITE_CONFIG",
          entityType: "SITE_CONFIG",
          entityId: "GLOBAL",
          diff: JSON.stringify(updatedKeys),
        },
      });
    } catch {}

    const allConfigs = await prisma.siteConfig.findMany({
      orderBy: { key: "asc" },
    });

    const configMap = allConfigs.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return NextResponse.json({
      success: true,
      message: `Updated ${updatedKeys.length} configuration parameter(s).`,
      configs: allConfigs,
      configMap,
    });
  } catch (error) {
    console.error("Save site config error:", error);
    return NextResponse.json({ error: "Failed to update site configuration." }, { status: 500 });
  }
}
