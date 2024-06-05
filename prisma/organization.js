"use server";

import { sendMail } from "@/helper/mail";
import prisma from "./prisma";
import randomstring from "randomstring";
import { generateSuperAdmin } from "./employee";

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

export const updateVerification = async (orgno, state) => {
  try {
    let org = await prisma.organization.update({
      where: {
        orgno: orgno,
      },
      data: {
        verified: state,
      },
    });
    if (org) {
      let superAdminReq = await generateSuperAdmin(orgno);
      if (superAdminReq.success) {
        let message = `Greetings from Animalize! Your organization has been verified.<br><br>Super Admin credentials:<br>Username (Emp. No): ${superAdminReq.data.empno}<br>Password: ${superAdminReq.data.password}<br><br>Reagrds<br>Animalize HQ`;
        if (state == true) {
          await sendMail(
            org.email,
            "Congratulations! Organization Verified",
            message
          );
          return {
            success: true,
            message: "Organization verification updated",
          };
        }
      }
    } else {
      return {
        success: false,
        message: "Failed to update organization verification",
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

export const getOrganization = async (orgno) => {
  let organization = await prisma.organization.findUnique({
    where: {
      orgno: orgno,
    },
  });
  if (organization) {
    return {
      success: true,
      data: organization,
    };
  } else {
    return {
      success: false,
      message: "Organization not found",
    };
  }
};
