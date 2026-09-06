import prisma from "./prisma.js";

/**
 * Dispatches a real-time notification alert when a new inquiry is registered.
 * Supports Slack, Discord, Telegram, or custom webhook endpoints configured in SiteConfig.
 *
 * @param {object} inquiry - The newly created Inquiry database record
 * @returns {Promise<{ delivered: boolean, target?: string, error?: string }>}
 */
export async function dispatchNewLeadAlert(inquiry) {
  try {
    // 1. Fetch notification configurations from SiteConfig
    const configs = await prisma.siteConfig.findMany({
      where: {
        key: {
          in: ["NOTIFICATION_WEBHOOK_URL", "NOTIFICATION_ENABLED", "NOTIFICATION_BOT_TOKEN", "NOTIFICATION_CHAT_ID"],
        },
      },
    });

    const configMap = configs.reduce((acc, c) => {
      acc[c.key] = c.value;
      return acc;
    }, {});

    const isEnabled = configMap.NOTIFICATION_ENABLED !== "false";
    const webhookUrl = configMap.NOTIFICATION_WEBHOOK_URL || process.env.NOTIFICATION_WEBHOOK_URL;

    if (!isEnabled) {
      return { delivered: false, reason: "Notifications globally disabled in SiteConfig" };
    }

    const dossierUrl = `${process.env.NEXT_PUBLIC_APP_URL || "https://gerat.et"}/dashboard/inquiries/${inquiry.id}`;

    // Format rich text alert
    const alertMessage = [
      `🚨 *NEW CLIENT LEAD REGISTERED* // \`${inquiry.telemetryCode}\``,
      `*Client:* ${inquiry.fullName} ${inquiry.company ? `(${inquiry.company})` : ""}`,
      `*Discipline:* ${inquiry.discipline}`,
      `*Budget:* ${inquiry.budgetRange} | *Timeline:* ${inquiry.timeline}`,
      `*Contact:* ${inquiry.phone} | ${inquiry.email}`,
      `*Priority:* ${inquiry.priority}`,
      `*Brief:* ${inquiry.projectBrief?.slice(0, 300) || "N/A"}`,
      `\n🔗 *Open Dossier:* ${dossierUrl}`,
    ].join("\n");

    if (!webhookUrl) {
      // No external webhook configured - log to operational console
      console.log("[TELEMETRY ALERT DISPATCHED (INTERNAL)]\n" + alertMessage);
      return { delivered: true, target: "INTERNAL_CONSOLE" };
    }

    // Determine payload based on destination platform
    let payload = {};
    if (webhookUrl.includes("discord.com")) {
      payload = {
        content: `🚨 **NEW CLIENT LEAD // ${inquiry.telemetryCode}**`,
        embeds: [
          {
            title: `${inquiry.fullName} — ${inquiry.discipline}`,
            url: dossierUrl,
            color: 16730624, // #FF4A00 Gerat Accent Spark
            fields: [
              { name: "Telemetry Code", value: inquiry.telemetryCode, inline: true },
              { name: "Budget Tier", value: inquiry.budgetRange, inline: true },
              { name: "Timeline", value: inquiry.timeline, inline: true },
              { name: "Phone", value: inquiry.phone, inline: true },
              { name: "Email", value: inquiry.email, inline: true },
              { name: "Company", value: inquiry.company || "Independent", inline: true },
              { name: "Project Scope", value: inquiry.projectBrief?.slice(0, 500) || "N/A" },
            ],
            footer: { text: "Gerat Software Solutions PLC // Mission Control Telemetry" },
            timestamp: new Date().toISOString(),
          },
        ],
      };
    } else if (webhookUrl.includes("api.telegram.org")) {
      payload = {
        chat_id: configMap.NOTIFICATION_CHAT_ID || process.env.TELEGRAM_CHAT_ID,
        text: alertMessage,
        parse_mode: "Markdown",
      };
    } else {
      // Standard Slack / Generic Webhook format
      payload = {
        text: alertMessage,
        blocks: [
          {
            type: "header",
            text: {
              type: "plain_text",
              text: `🚨 NEW CLIENT INTAKE // ${inquiry.telemetryCode}`,
            },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Client:*\n${inquiry.fullName}` },
              { type: "mrkdwn", text: `*Company:*\n${inquiry.company || "Independent"}` },
              { type: "mrkdwn", text: `*Discipline:*\n${inquiry.discipline}` },
              { type: "mrkdwn", text: `*Budget:*\n${inquiry.budgetRange}` },
              { type: "mrkdwn", text: `*Phone:*\n${inquiry.phone}` },
              { type: "mrkdwn", text: `*Email:*\n${inquiry.email}` },
            ],
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Brief:*\n${inquiry.projectBrief?.slice(0, 400) || "N/A"}`,
            },
          },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "OPEN LEAD DOSSIER →" },
                url: dossierUrl,
                style: "primary",
              },
            ],
          },
        ],
      };
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => "");
      console.warn(`Webhook alert response error (${response.status}):`, errText);
      return { delivered: false, error: `HTTP ${response.status}: ${errText}` };
    }

    return { delivered: true, target: webhookUrl };
  } catch (err) {
    console.error("Alert dispatch failed:", err.message);
    return { delivered: false, error: err.message };
  }
}

/**
 * Sends a test ping to verify webhook connectivity.
 *
 * @param {string} webhookUrl - The target webhook URL
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function sendTestWebhookPing(webhookUrl) {
  if (!webhookUrl || !webhookUrl.startsWith("http")) {
    throw new Error("Invalid webhook URL. Must start with http:// or https://");
  }

  const payload = {
    text: "🛰️ *[GERAT MISSION CONTROL]* // Test Telemetry Ping: Webhook alert pipeline is active and operational.",
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Endpoint returned status ${res.status}: ${text}`);
    }

    return { success: true, message: "Test alert ping delivered successfully." };
  } catch (err) {
    clearTimeout(timeout);
    throw new Error(`Failed to deliver test ping: ${err.message}`);
  }
}
