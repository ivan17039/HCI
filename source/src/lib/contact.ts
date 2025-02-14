"use server"

import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactEmail(formData: {
  name: string
  email: string
  phone: string
  country: string
  message: string
}) {
  try {
    // Send notification email to you (admin)
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.EMAIL_TO || "ivanbarada1703@gmail.com",
      subject: `New Contact Form Message from ${formData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2 style="color: #333;">New Contact Form Message</h2>
          <div style="margin: 20px 0; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            <p><strong>Country:</strong> ${formData.country}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${formData.message}</p>
          </div>
          <p style="color: #666; font-size: 14px;">This message was sent from your website's contact form.</p>
        </div>
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: "Failed to send message. Please try again later." }
  }
}

