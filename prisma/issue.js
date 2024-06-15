"use server";
import { sendMail } from "@/helper/mail";
import prisma from "./prisma";
import { generalUpdateTemplate } from "@/templates/email";

export const createIssue = async (data, emails) => {
  try {
    await prisma.issue.create({
      data,
    });

    if (emails.length > 0) {
      try {
        await sendMail(
          emails,
          "Open issue: " + data.title,
          generalUpdateTemplate("Issue created", data.description)
        );
        return {
          success: true,
          message: "Issue created successfully",
        };
      } catch (error) {
        console.log("Error sending email: ", error);
      }
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getIssues = async (orgno) => {
  try {
    const issues = await prisma.issue.findMany({
      where: {
        orgno,
      },
    });

    return {
      success: true,
      data: issues,
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteIssue = async (id) => {
  try {
    await prisma.issue.delete({
      where: {
        id,
      },
    });

    return {
      success: true,
      message: "Issue deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const markClosed = async (id) => {
  try {
    await prisma.issue.update({
      where: {
        id,
      },
      data: {
        status: "closed",
      },
    });

    return {
      success: true,
      message: "Issue marked as closed",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const markOpen = async (id) => {
  try {
    await prisma.issue.update({
      where: {
        id,
      },
      data: {
        status: "open",
      },
    });

    return {
      success: true,
      message: "Issue marked as open",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};
