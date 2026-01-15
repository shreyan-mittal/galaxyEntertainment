import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { name, email, phone, message } = req.body ?? {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Save to Supabase
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([{ name, email, phone: phone ?? "", message }]);

    if (dbError) {
      return res.status(500).json({ error: dbError.message });
    }

    const toEmails = (process.env.NOTIFY_TO_EMAIL || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean);

    if (toEmails.length === 0) {
      return res.status(500).json({ error: "NOTIFY_TO_EMAIL is missing" });
    }

    // Send email
    await resend.emails.send({
      from: `Galaxy Entertainment <${process.env.NOTIFY_FROM_EMAIL}>`,
      to: toEmails,
      subject: `New enquiry from ${name}`,
      text: `Name: ${name}
Email: ${email}
Phone: ${phone ?? ""}
Message:
${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err?.message ?? "Unknown error" });
  }
}
