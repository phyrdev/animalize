"use server";
import nodemailer from "nodemailer";

export async function sendMail(to = "", subject = "", html = "", text = "") {
  console.log("Sending mail", to, subject, html, text);
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.in",
    secure: true,
    port: 465,
    auth: {
      user: process.env.ZOHO_MAIL,
      pass: process.env.ZOHO_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Animalize - Lms" <noreply@phyr.global>', // sender address
      to,
      subject,
      text,
      html,
    });
    console.log("Mail sent");
    return {
      success: true,
      message: "Success",
    };
  } catch (error) {
    console.log(error.message);
    return {
      success: false,
      message: "Failure",
    };
  }
}
