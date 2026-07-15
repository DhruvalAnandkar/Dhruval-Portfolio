import { Resend } from "resend";
import { NextResponse } from "next/server";

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
    try {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            console.error("RESEND_API_KEY is missing. Add it to .env.local and Vercel env vars.");
            return NextResponse.json(
                { error: "Email service not configured.", code: "NO_API_KEY" },
                { status: 503 }
            );
        }

        const body = await request.json();
        const name = typeof body.name === "string" ? body.name.trim() : "";
        const email = typeof body.email === "string" ? body.email.trim() : "";
        const message = typeof body.message === "string" ? body.message.trim() : "";

        if (!name || !email || !message) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return NextResponse.json({ error: "Invalid email." }, { status: 400 });
        }

        const resend = new Resend(apiKey);
        const to = process.env.CONTACT_TO_EMAIL || "dhruvalabroad@gmail.com";
        const from =
            process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safeMessage = escapeHtml(message);

        const { error } = await resend.emails.send({
            from,
            to: [to],
            replyTo: email,
            subject: `New message from ${name} · Portfolio`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #f8fafc; border-radius: 16px;">
          <h2 style="color: #0f172a; margin-bottom: 4px;">New Portfolio Message</h2>
          <p style="color: #64748b; font-size: 13px; margin-top: 0;">via dhruvalanandkar.com</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px; width: 80px;">Name</td>
              <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #64748b; font-size: 13px;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #10b981;">${safeEmail}</a></td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700; margin-bottom: 8px;">Message</p>
          <p style="color: #334155; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${safeMessage}</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center;">Hit Reply to respond directly to ${safeName}.</p>
        </div>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return NextResponse.json(
                { error: error.message || "Failed to send email.", code: "RESEND_ERROR" },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Contact route error:", err);
        return NextResponse.json({ error: "Server error.", code: "SERVER_ERROR" }, { status: 500 });
    }
}
