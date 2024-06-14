"use server";

import { sendMail } from "@/helper/mail";
import prisma from "./prisma";
import randomstring from "randomstring";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { caseCreatedTemplate } from "@/templates/email";

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

    let sbt = (
      getCurrencySymbol(rp.payment.currency) + rp.payment.subtotal
    ).toString();

    let due = (
      getCurrencySymbol(rp.payment.currency) +
      (rp.payment.subtotal - rp.payment.paidAmount)
    ).toString();

    reportSpecifics.parentEmail.length != 0 &&
      (await sendMail(
        reportSpecifics.parentEmail,
        `Case created for Rept no: LE89TPRES`,
        caseCreatedTemplate(
          new Date(rp.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          rp.reportno,
          rp.parentFirstName,
          rp.parentEmail,
          rp.organization.name,
          rp.organization.email,
          rp.organization.phone,
          rp.tests.length,
          sbt,
          capitalizeFirstLetter(rp.payment.paymentMode),
          capitalizeFirstLetter(rp.payment.paymentStatus),
          due
        )
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
        organization: true,
        vials: true,
        reviewedBy: true,
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
        organization: true,
        vials: true,
        reviewedBy: true,
      },
    });
    if (report) {
      return {
        success: true,
        message: "Report fetched successfully",
        data: report,
      };
    } else {
      return {
        success: false,
        message: "Report not found",
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

export const getReportByReptNo = async (reportno) => {
  try {
    const report = await prisma.report.findUnique({
      where: {
        reportno,
      },
      include: {
        payment: true,
        organization: true,
        vials: true,
      },
    });
    if (report) {
      return {
        success: true,
        message: "Report fetched successfully",
        data: report,
      };
    } else {
      return {
        success: false,
        message: "Report not found",
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

export const markSampleCollected = async (reportno) => {
  try {
    let report = await prisma.report.update({
      where: {
        reportno,
      },
      data: {
        status: "S201",
      },
    });

    await sendMail(
      report.parentEmail,
      "Sample collected",
      `Your pet's sample for Reptno: ${reportno} has been collected successfully. We will keep you updated on the progress.`
    );

    return {
      success: true,
      message: "Sample collected successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const feedResults = async (reportno, tests) => {
  try {
    let report = await prisma.report.update({
      where: {
        reportno,
      },
      data: {
        status: "S202",
        tests,
      },
    });

    return {
      success: true,
      message: "Results fed successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const saveReview = async (reportno, pathno, tests) => {
  try {
    let report = await prisma.report.update({
      where: {
        reportno,
      },
      data: {
        status: "S203",
        pathno,
        tests,
      },
    });

    return {
      success: true,
      message: "Review saved successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const failReport = async (reportno, failStatement) => {
  try {
    let report = await prisma.report.update({
      where: {
        reportno,
      },
      data: {
        status: "S204",
        failStatement,
      },
    });

    return {
      success: true,
      message: "Report applied for retest successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const revertSampleCollection = async (reportno) => {
  try {
    let report = await prisma.report.findUnique({
      where: {
        reportno,
      },
    });

    report.tests.map((test) => {
      test.parameters.map((param) => {
        param.value = "";
      });
      test.observation = "";
    });

    await prisma.report.update({
      where: {
        reportno,
      },
      data: {
        status: "S200",
        tests: report.tests,
      },
    });

    return {
      success: true,
      message: "Sample collection reverted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const revertFeedResults = async (reportno) => {
  try {
    let report = await prisma.report.findUnique({
      where: {
        reportno,
      },
    });

    report.tests.map((test) => {
      test.parameters.map((param) => {
        param.value = "";
      });
      test.observation = "";
    });

    await prisma.report.update({
      where: {
        reportno,
      },
      data: {
        status: "S201",
        tests: report.tests,
      },
    });

    return {
      success: true,
      message: "Results reverted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const revertPathologyReview = async (reportno) => {
  try {
    let report = await prisma.report.findUnique({
      where: {
        reportno,
      },
    });

    report.tests.map((test) => {
      test.observation = "";
    });

    await prisma.report.update({
      where: {
        reportno,
      },
      data: {
        status: "S202",
        tests: report.tests,
      },
    });

    return {
      success: true,
      message: "Review reverted successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const markAsDelivered = async (reportno) => {
  try {
    let report = await prisma.report.update({
      where: {
        reportno,
      },
      data: {
        status: "S205",
      },
    });

    return {
      success: true,
      message: "Report marked as delivered successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
