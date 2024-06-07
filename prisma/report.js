"use server";

import prisma from "./prisma";
import randomstring from "randomstring";

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
    });

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
