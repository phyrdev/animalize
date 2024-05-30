"use server";
import nodemailer from "nodemailer";

export async function sendMail(to = "", subject = "", html = "", text = "") {
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
      from: '"Animalize - Accounts Manager" <noreply@phyr.global>', // sender address
      to,
      subject,
      text,
      html,
    });
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
