"use server";
import { sendMail } from "@/helper/mail";
import prisma from "./prisma";
import randomstring from "randomstring";

export const createOrganization = async (data) => {
  try {
    let org = await prisma.organization.create({
      data: {
        name: data.name,
        orgno: await generateOrgno(),
        email: data.email,
        phone: data.phone,
        zipcode: data.zipcode,
        type: data.type,
        size: data.size,
        currency: data.currency,
      },
    });
    if (org) {
      console.log(org);
      let message = `We are currently reviewing your application. Your organization number is ${org.orgno}. Please use this number for all future communication.`;
      await sendMail(data.email, "Application Submitted", message);

      return {
        success: true,
        message: "Application submitted successfully",
      };
    } else {
      return {
        success: false,
        message: "Failed to submit application",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const generateOrgno = async () => {
  let orgno = randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  let org = await prisma.organization.findUnique({
    where: {
      orgno: orgno,
    },
  });
  if (org) {
    return generateOrgno();
  } else {
    return orgno;
  }
};
