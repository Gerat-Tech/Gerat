import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      company = null,
      roleTitle = null,
      discipline = "SOFTWARE ARCHITECTURE",
      subServices = [],
      timeline = "STANDARD (1-3 MONTHS)",
      budgetRange = "75K - 150K ETB",
      projectBrief = "",
      metadata = {},
      sourceUrl = "/",
    } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email, and phone number are required." },
        { status: 400 }
      );
    }

    // Determine prefix based on discipline
    const isBrand =
      discipline.toUpperCase().includes("BRAND") ||
      discipline.toUpperCase().includes("CREATIVE") ||
      discipline.toUpperCase().includes("LOGO") ||
      discipline.toUpperCase().includes("PERSONAL");

    const prefix = isBrand ? "GRT-BRD" : "GRT-ENG";
    const datePart = new Date().toISOString().slice(0, 7).replace("-", ""); // e.g. 202609
    const randomHex = Math.floor(100000 + Math.random() * 900000); // 6-digit random
    const telemetryCode = `${prefix}-${datePart}-${randomHex}`;

    // Read client IP and user-agent if available
    const ipAddress = request.headers.get("x-forwarded-for") || null;
    const userAgent = request.headers.get("user-agent") || null;

    // Persist inquiry to database
    const inquiry = await prisma.inquiry.create({
      data: {
        telemetryCode,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        company: company ? company.trim() : null,
        roleTitle: roleTitle ? roleTitle.trim() : null,
        discipline,
        subServices: JSON.stringify(subServices),
        timeline,
        budgetRange,
        projectBrief: projectBrief ? projectBrief.trim() : "Direct consultation request via web portal.",
        metadata: JSON.stringify(metadata),
        sourceUrl,
        ipAddress,
        userAgent,
        status: "NEW_INTAKE",
        priority: budgetRange.includes("250K+") || budgetRange.includes("150K") ? "CRITICAL_ENTERPRISE" : "MEDIUM",
      },
    });

    return NextResponse.json({
      success: true,
      telemetryCode: inquiry.telemetryCode,
      inquiryId: inquiry.id,
      message: "Inquiry telemetry registered successfully.",
    });
  } catch (error) {
    console.error("Intake submission error:", error);
    return NextResponse.json(
      { error: "Failed to persist intake telemetry to database." },
      { status: 500 }
    );
  }
}
