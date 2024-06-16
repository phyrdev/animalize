"use server";
import nodemailer from "nodemailer";

export async function sendMail(to = "", subject = "", html = "", text = "") {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: true,
    port: 465,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
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
