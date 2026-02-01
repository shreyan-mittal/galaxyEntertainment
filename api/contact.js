import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 🔎 HARD ENV CHECK (no VITE_ here)
  const required = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "RESEND_API_KEY",
    "NOTIFY_TO_EMAIL",
    "NOTIFY_FROM_EMAIL",
  ];

  const missing = required.filter((k) => !process.env[k]);

  if (missing.length > 0) {
    console.error("ENV CHECK FAILED", Object.fromEntries(
      required.map(k => [k, Boolean(process.env[k])])
    ));

    return res.status(500).json({
      error: "Server misconfigured: missing environment variables",
      missing,
    });
  }

  const { name, email, phone, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Save to Supabase
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([{ name, email, phone: phone || "", message }]);

    if (dbError) throw dbError;

    // Email
    await resend.emails.send({
      from: process.env.NOTIFY_FROM_EMAIL,
      to: process.env.NOTIFY_TO_EMAIL.split(","),
      subject: "New Contact Form Submission",
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "-"}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("CONTACT API ERROR", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}