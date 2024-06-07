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
  const reportno = randomstring.generate({
    length: 10,
    charset: "alphanumeric",
  });
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
