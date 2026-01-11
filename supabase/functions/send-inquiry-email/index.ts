import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const inquiryData: InquiryData = await req.json();
    
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const recipientEmail = Deno.env.get("INQUIRY_RECIPIENT_EMAIL") || "galaxyentertainmentaustralia@gmail.com";

    if (!resendApiKey) {
      throw new Error("RESEND_API_KEY environment variable is not set");
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: "Galaxy Entertainment <onboarding@resend.dev>",
        to: [recipientEmail],
        reply_to: inquiryData.email,
        subject: `New Inquiry from ${inquiryData.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #1e3a8a; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">New Contact Form Submission</h2>
            
            <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #1e3a8a;">Name:</strong> ${inquiryData.name}</p>
              <p style="margin: 10px 0;"><strong style="color: #1e3a8a;">Email:</strong> <a href="mailto:${inquiryData.email}">${inquiryData.email}</a></p>
              <p style="margin: 10px 0;"><strong style="color: #1e3a8a;">Phone:</strong> <a href="tel:${inquiryData.phone}">${inquiryData.phone}</a></p>
            </div>
            
            <div style="background-color: #fff; padding: 20px; border-left: 4px solid #f59e0b; margin: 20px 0;">
              <h3 style="color: #1e3a8a; margin-top: 0;">Message:</h3>
              <p style="line-height: 1.6; color: #374151;">${inquiryData.message}</p>
            </div>
            
            <div style="text-align: center; padding: 20px; color: #6b7280; font-size: 12px;">
              <p>This email was sent from your Galaxy Entertainment website contact form.</p>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text();
      throw new Error(`Failed to send email: ${errorData}`);
    }

    const result = await emailResponse.json();

    return new Response(
      JSON.stringify({ success: true, messageId: result.id }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});