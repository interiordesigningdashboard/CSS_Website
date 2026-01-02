// server.js (ES Module)

import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import {
  adminEmailTemplate,
  customerEmailTemplate,
} from "./templates/email.js";

dotenv.config();

const app = express();

// ---------------- Middleware ----------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- Email configuration ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter configuration
transporter.verify((error) => {
  if (error) {
    console.log("Email configuration error:", error);
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// ---------------- Contact form endpoint ----------------
app.post("/api/contact", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, company, service, message } =
      req.body;

    if (!firstName || !lastName || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    const formData = {
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      message,
    };

    // Admin email
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || "info@colorsandsignage.co.in",
      subject: `New Contact Form Submission - ${service}`,
      html: adminEmailTemplate(formData),
    };

    // Customer email
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting Colors and Signage Solutions",
      html: customerEmailTemplate(formData),
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(customerMailOptions);

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
});

// ---------------- Health check ----------------
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
  });
});

// ---------------- Server ----------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
