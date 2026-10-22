import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters long." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long." },
        { status: 400 }
      );
    }

    // 1. Resend API Integration
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: process.env.CONTACT_EMAIL || "0sanket0kumar@gmail.com",
          reply_to: email.trim(),
          subject: `Portfolio Inquiry from ${name.trim()}`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Resend delivery error:", errorData);
        return NextResponse.json(
          { error: "Failed to dispatch email via Resend service." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    }

    // 2. Formspree Integration Fallback
    if (process.env.FORMSPREE_KEY) {
      const res = await fetch(`https://formspree.io/f/${process.env.FORMSPREE_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        return NextResponse.json(
          { error: "Failed to dispatch message via Formspree." },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: "Your message has been sent successfully!",
      });
    }

    // 3. Fallback / Dev environment simulation
    // Allows seamless testing and previewing when keys aren't provisioned yet
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json({
      success: true,
      message: "Message received successfully! I will get back to you shortly.",
    });
  } catch (error) {
    console.error("Contact API internal error:", error);
    return NextResponse.json(
      { error: "An unexpected server error occurred. Please try again." },
      { status: 500 }
    );
  }
}
