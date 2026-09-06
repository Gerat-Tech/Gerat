import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = await params;
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
      include: {
        assignedTo: {
          select: { id: true, name: true, email: true, role: true },
        },
        notes: {
          include: {
            author: { select: { id: true, name: true, role: true } },
          },
          orderBy: { createdAt: "desc" },
        },
        communications: {
          include: {
            actor: { select: { id: true, name: true } },
          },
          orderBy: { loggedAt: "desc" },
        },
      },
    });

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry dossier not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error("Get inquiry error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiry dossier." }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { status, priority, assignedToId } = body;

    const data = {};
    if (status) data.status = status;
    if (priority) data.priority = priority;
    if (assignedToId !== undefined) data.assignedToId = assignedToId || null;

    const updated = await prisma.inquiry.update({
      where: { id },
      data,
    });

    // Log mutation in audit trail
    try {
      await prisma.auditLog.create({
        data: {
          actorId: user.id,
          action: "UPDATE_INQUIRY_STATUS",
          entityType: "INQUIRY",
          entityId: id,
          diff: JSON.stringify(data),
        },
      });
    } catch {}

    return NextResponse.json({ success: true, inquiry: updated });
  } catch (error) {
    console.error("Update inquiry error:", error);
    return NextResponse.json({ error: "Failed to update inquiry." }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { type, content, channel, subject, summary, outcome, isPinned = false } = body;

    if (type === "NOTE") {
      if (!content?.trim()) {
        return NextResponse.json({ error: "Note content cannot be empty." }, { status: 400 });
      }

      const note = await prisma.inquiryNote.create({
        data: {
          inquiryId: id,
          authorId: user.id,
          content: content.trim(),
          isPinned,
        },
        include: {
          author: { select: { id: true, name: true, role: true } },
        },
      });

      return NextResponse.json({ success: true, note });
    }

    if (type === "COMMUNICATION") {
      if (!summary?.trim()) {
        return NextResponse.json({ error: "Communication summary is required." }, { status: 400 });
      }

      const comm = await prisma.inquiryCommunication.create({
        data: {
          inquiryId: id,
          actorId: user.id,
          channel: channel || "WHATSAPP",
          subject: subject || null,
          summary: summary.trim(),
          outcome: outcome || null,
        },
        include: {
          actor: { select: { id: true, name: true } },
        },
      });

      return NextResponse.json({ success: true, communication: comm });
    }

    return NextResponse.json({ error: "Invalid action type. Expected NOTE or COMMUNICATION." }, { status: 400 });
  } catch (error) {
    console.error("Post inquiry activity error:", error);
    return NextResponse.json({ error: "Failed to record inquiry activity." }, { status: 500 });
  }
}
