import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { firstName, lastName, email, phone, message, bill, estimate } = data;

    const recipient = "elev8solar.in@gmail.com";
    const subject = `New Solar Lead: ${firstName || "Website Inquiry"} ${lastName || ""}`.trim();

    // Format rich body
    const emailBody = [
      "NEW INQUIRY FROM ELEV8SOLAR.CO",
      "========================================",
      `Name: ${firstName || ""} ${lastName || ""}`.trim(),
      `Email: ${email || "Not provided"}`,
      `Phone: ${phone || "Not provided"}`,
      bill ? `Monthly Bill: ₹${Number(bill).toLocaleString()}` : null,
      estimate ? `Estimated Solar Cost: ₹${Number(estimate).toLocaleString()}` : null,
      message ? `Message:\n${message}` : null,
      "========================================",
      `Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST`,
      "Source: elev8solar.co"
    ].filter(Boolean).join("\n\n");

    // Attempt delivery via FormSubmit free email routing (directly delivers formatted HTML/Text to elev8solar.in@gmail.com)
    try {
      await fetch("https://formsubmit.co/ajax/elev8solar.in@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          _subject: subject,
          _captcha: "false",
          _template: "table",
          Name: `${firstName || ""} ${lastName || ""}`.trim(),
          Email: email || "Not provided",
          Phone: phone || "Not provided",
          "Monthly Bill": bill ? `₹${bill}` : "N/A",
          "Estimated Cost": estimate ? `₹${estimate}` : "N/A",
          Message: message || "No message entered"
        })
      });
    } catch (err) {
      console.warn("External relay failed, fallback logging:", err);
    }

    console.log("Lead captured for elev8solar.in@gmail.com:", emailBody);

    return NextResponse.json({ success: true, message: "Inquiry forwarded successfully" });
  } catch (error) {
    console.error("Error in lead handler:", error);
    return NextResponse.json({ success: false, error: "Failed to process lead" }, { status: 500 });
  }
}
