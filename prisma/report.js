"use server";

import prisma from "./prisma";

export const createReport = async (report) => {
  try {
    await prisma.report.create({
      data: report,
    });

    return {
      success: true,
      message: "Report created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
