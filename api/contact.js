import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { full_name, work_email, company, need, message } = req.body ?? {};

    // Basic validation
    if (!full_name || !work_email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Supabase (server-side only)
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          full_name,
          work_email,
          company: company ?? "",
          need: need ?? "",
          message,
        },
      ]);

    if (dbError) {
      return res.status(500).json({ error: dbError.message });
    }

    // Optional email notify via Resend
    const resendKey = process.env.RESEND_API_KEY;
    const notifyTo = process.env.NOTIFY_TO_EMAIL;

    if (resendKey && notifyTo) {
      const resend = new Resend(resendKey);

      await resend.emails.send({
        from: process.env.FROM_EMAIL || "Website <no-reply@yourdomain.com>",
        to: notifyTo.split(",").map((s) => s.trim()),
        subject: `New enquiry: ${need || "General"}`,
        text: `Name: ${full_name}
Email: ${work_email}
Company: ${company || "-"}
Need: ${need || "-"}
Message:
${message}`,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err?.message || "Server error" });
  }
}
