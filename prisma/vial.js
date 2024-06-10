"use server";

import randomstring from "randomstring";
import prisma from "./prisma";

export const createVial = async (orgno, empno, reportno) => {
  let vialno = await generateVialId(orgno);

  if (vialno) {
    try {
      let vial = await prisma.vial.create({
        data: {
          vialno: vialno,
          orgno: orgno,
          empno: empno,
          reportno: reportno,
        },
      });
      return {
        success: true,
        message: "Vial created successfully",
        data: vial,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Failed to create vial",
        data: null,
      };
    }
  }
};

export const deleteVial = async (vialno) => {
  try {
    let vial = await prisma.vial.delete({
      where: {
        vialno: vialno,
      },
    });
    return {
      success: true,
      message: "Vial deleted successfully",
      data: vial,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to delete vial",
      data: null,
    };
  }
};

export const getVialsByReport = async (reportno) => {
  try {
    let vials = await prisma.vial.findMany({
      where: {
        reportno: reportno,
      },
    });
    return {
      success: true,
      message: "Vials fetched successfully",
      data: vials,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to fetch vials",
      data: null,
    };
  }
};

const generateVialId = async (orgno) => {
  let vialno_ = randomstring
    .generate({ length: 8, charset: "alphanumeric" })
    .toUpperCase();

  try {
    let vial = await prisma.vial.findUnique({
      where: {
        vialno: vialno_,
        orgno: orgno,
      },
    });
    if (vial) {
      return await generateVialId();
    } else {
      return vialno_;
    }
  } catch (error) {
    return null;
  }
};
