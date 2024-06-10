"use server";
import prisma from "./prisma";

export const getOrgPayments = async (orgno) => {
  try {
    const payments = await prisma.payment.findMany({
      where: {
        orgno,
      },
      include: {
        report: {
          include: {
            organization: true,
            payment: true,
          },
        },
      },
    });

    return {
      success: true,
      message: "Payments fetched successfully",
      data: payments,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
