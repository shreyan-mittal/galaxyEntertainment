import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, event, city, message } = req.body || {};

  if (!name || !email || !message || !event || !city) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // ✅ Fail fast if env vars not loaded
  const {
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    RESEND_API_KEY,
    NOTIFY_FROM_EMAIL,
    NOTIFY_TO_EMAIL,
  } = process.env;

  if (!SUPABASE_URL) {
    console.error("Missing SUPABASE_URL");
    return res.status(500).json({ error: "Missing env: SUPABASE_URL" });
  }
  if (!SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing SUPABASE_SERVICE_ROLE_KEY");
    return res
      .status(500)
      .json({ error: "Missing env: SUPABASE_SERVICE_ROLE_KEY" });
  }
  if (!RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return res.status(500).json({ error: "Missing env: RESEND_API_KEY" });
  }
  if (!NOTIFY_FROM_EMAIL) {
    console.error("Missing NOTIFY_FROM_EMAIL");
    return res.status(500).json({ error: "Missing env: NOTIFY_FROM_EMAIL" });
  }
  if (!NOTIFY_TO_EMAIL) {
    console.error("Missing NOTIFY_TO_EMAIL");
    return res.status(500).json({ error: "Missing env: NOTIFY_TO_EMAIL" });
  }

  // ✅ basic sanitization for HTML emails
  const escapeHtml = (str = "") =>
    String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const safeMessage = escapeHtml(message).replaceAll("\n", "<br/>");

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
    const resend = new Resend(RESEND_API_KEY);

    console.log("Attempting to insert into Supabase...");
    
    // ✅ check supabase insert response with better error logging
    const { data: insertData, error: insertError } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: String(name).trim(),
          email: String(email).trim(),
          phone: phone ? String(phone).trim() : "",
          event: String(event).trim(),
          city: String(city).trim(),
          message: String(message).trim(),
        },
      ])
      .select();

    if (insertError) {
      console.error("Supabase insert error:", JSON.stringify(insertError, null, 2));
      return res.status(500).json({ 
        error: "Database insert failed", 
        details: insertError.message 
      });
    }

    console.log("Supabase insert successful:", insertData);
    console.log("Attempting to send email...");

    // ✅ normalize "to" list
    const toList = NOTIFY_TO_EMAIL.split(",")
      .map((x) => x.trim())
      .filter(Boolean);

    console.log("Sending email to:", toList);
    console.log("From:", NOTIFY_FROM_EMAIL);

    const emailResult = await resend.emails.send({
      from: NOTIFY_FROM_EMAIL,
      to: toList,
      subject: `New Inquiry — ${event} (${city})`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "-")}</p>
        <p><strong>Event:</strong> ${escapeHtml(event)}</p>
        <p><strong>City:</strong> ${escapeHtml(city)}</p>
        <p><strong>Message:</strong><br/>${safeMessage}</p>
      `,
    });

    console.log("Email result:", JSON.stringify(emailResult, null, 2));

    // Check if resend returns an error
    if (emailResult?.error) {
      console.error("Resend error:", emailResult.error);
      return res.status(500).json({ 
        error: "Email send failed", 
        details: emailResult.error.message 
      });
    }

    console.log("Success! Form submitted and email sent.");
    return res.status(200).json({ success: true });
    
  } catch (err) {
    console.error("API error:", err);
    console.error("Error stack:", err.stack);
    return res.status(500).json({ 
      error: "Internal server error",
      details: err.message 
    });
  }
}