"use server";

import { sendMail } from "@/helper/mail";
import prisma from "./prisma";
import randomstring from "randomstring";
import { getCurrencySymbol } from "@/helper/refactor";

export const createReport = async (reportSpecifics, billingSpecifics) => {
  try {
    let rp = await prisma.report.create({
      data: {
        reportno: await generateUniqueReportno(),
        ...reportSpecifics,
        payment: {
          create: billingSpecifics,
        },
      },
      include: {
        payment: true,
        organization: true,
      },
    });

    reportSpecifics.parentEmail.length != 0 &&
      (await sendMail(
        reportSpecifics.parentEmail,
        "Your case has been created",
        `Your report number is ${rp.reportno}.<br/><br/>Pet name: ${
          rp.petName
        }.<br/>Subtotal: ${getCurrencySymbol(rp.payment.currency)} ${
          rp.payment.subtotal
        }<br/>Payment status: ${
          rp.payment.paymentStatus
        }. <br/> Payment method: ${rp.payment.paymentMode}`
      ));

    return {
      success: true,
      message: "Report created successfully",
      data: rp,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

const generateUniqueReportno = async () => {
  const reportno = randomstring
    .generate({
      length: 10,
      charset: "alphanumeric",
    })
    .toUpperCase();
  const report = await prisma.report.findUnique({
    where: {
      reportno,
    },
  });

  if (report) {
    return generateUniqueReportno();
  }

  return reportno;
};

export const getOrgReports = async (orgno) => {
  try {
    const reports = await prisma.report.findMany({
      where: {
        orgno,
      },
      include: {
        payment: true,
      },
    });

    return {
      success: true,
      message: "Reports fetched successfully",
      data: reports,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const flagReport = async (id) => {
  try {
    await prisma.report.update({
      where: {
        id,
      },
      data: {
        flagged: true,
        payment: {
          update: {
            flagged: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Report flagged successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const unflagReport = async (id) => {
  try {
    await prisma.report.update({
      where: {
        id,
      },
      data: {
        flagged: false,
        payment: {
          update: {
            flagged: false,
          },
        },
      },
    });

    return {
      success: true,
      message: "Report unflagged successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getReportById = async (id) => {
  try {
    const report = await prisma.report.findUnique({
      where: {
        id,
      },
      include: {
        payment: true,
      },
    });

    return {
      success: true,
      message: "Report fetched successfully",
      data: report,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateReport = async (id, reportSpecifics, billingSpecifics) => {
  try {
    await prisma.report.update({
      where: {
        id,
      },
      data: {
        ...reportSpecifics,
        payment: {
          update: {
            ...billingSpecifics,
          },
        },
      },
    });

    return {
      success: true,
      message: "Report updated successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
