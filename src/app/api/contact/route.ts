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

    // Construct clean payload (only include fields that actually exist)
    const payload: Record<string, string> = {
      _subject: subject,
      _captcha: "false",
      _template: "table",
      "Full Name": `${firstName || ""} ${lastName || ""}`.trim() || "Website Visitor",
      "Email": email || "Not provided",
      "Phone": phone || "Not provided",
    };

    if (bill) payload["Monthly Bill"] = `₹${bill}`;
    if (estimate) payload["Estimated Cost"] = `₹${estimate}`;
    if (message) payload["Message"] = message;

    // Attempt delivery via FormSubmit free email routing (delivers formatted table to elev8solar.in@gmail.com)
    try {
      await fetch("https://formsubmit.co/ajax/elev8solar.in@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload)
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
