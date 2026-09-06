import { NextResponse } from "next/server";
import { getCurrentUser, isAuthorized, ROLES } from "@/lib/auth";
import { sendTestWebhookPing } from "@/lib/notifications";

export async function POST(request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
    }

    if (!isAuthorized(user.role, [ROLES.SUPER_ADMIN])) {
      return NextResponse.json(
        { error: "Insufficient privileges to test telemetry webhooks." },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { webhookUrl } = body;

    if (!webhookUrl) {
      return NextResponse.json({ error: "Webhook URL is required." }, { status: 400 });
    }

    const result = await sendTestWebhookPing(webhookUrl);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to trigger webhook test ping." },
      { status: 400 }
    );
  }
}
