"use server";

import randomstring from "randomstring";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { sendMail } from "@/helper/mail";
import { generalUpdateTemplate } from "@/templates/email";

export const generateSuperAdmin = async (orgno) => {
  try {
    let empno = await generateUniqueEmpno();
    let password = randomstring.generate({
      length: 8,
      charset: "alphanumeric",
    });

    let hashedPassword = await bcrypt.hash(password, 10);

    let organization = await prisma.organization.findUnique({
      where: {
        orgno,
      },
    });

    let superAdmin = await prisma.employee.create({
      data: {
        empno,
        password: hashedPassword,
        role: "super-admin",
        email: organization.email,
        name: organization.name + " Super Admin",
        phone: organization.phone,
        zipcode: organization.zipcode,
        orgno,
      },
    });

    if (superAdmin) {
      return {
        success: true,
        message: "Super Admin created successfully.",
        data: {
          empno,
          password,
        },
      };
    } else {
      return {
        success: false,
        message: "Error creating Super Admin.",
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

export const generateUniqueEmpno = async () => {
  try {
    let empno = randomstring.generate({
      length: 8,
      charset: "numeric",
    });

    let emp = await prisma.employee.findUnique({
      where: {
        empno,
      },
    });

    if (emp) {
      generateUniqueEmpno();
    } else {
      return empno;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const validateCredentials = async (empno, password) => {
  try {
    let emp = await prisma.employee.findUnique({
      where: {
        empno,
      },
    });

    if (emp && (await bcrypt.compare(password, emp.password))) {
      return {
        success: true,
        message: "Password validated successfully.",
        data: emp,
      };
    } else {
      return {
        success: false,
        message: "Invalid employee number or password.",
      };
    }
  } catch (error) {}
};

export const authorizeCredentials = async (empno, password) => {
  try {
    let emp = await prisma.employee.findUnique({
      where: {
        empno,
      },
    });

    if (emp && (await bcrypt.compare(password, emp.password))) {
      return {
        success: true,
        message: "Password validated successfully.",
        data: {
          name: emp.name,
          email: emp.empno,
          role: emp.role,
          orgno: emp.orgno,
        },
      };
    } else {
      return {
        success: false,
        message: "Invalid employee number or password.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getEmployeeData = async (empno) => {
  try {
    let emp = await prisma.employee.findUnique({
      where: {
        empno,
      },
      include: {
        organization: true,
      },
    });

    if (emp) {
      return {
        success: true,
        message: "Employee data retrieved successfully.",
        data: emp,
      };
    } else {
      return {
        success: false,
        message: "Employee not found.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getEmployees = async (orgno) => {
  try {
    const employees = await prisma.employee.findMany({
      where: {
        orgno,
      },
      select: {
        id: true,
        empno: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        password: false,
        createdAt: true,
      },
    });

    return {
      success: true,
      data: employees,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const createEmployee = async (data, signature = "") => {
  try {
    let empno = await generateUniqueEmpno();
    let password = randomstring.generate({
      length: 8,
      charset: "alphanumeric",
    });

    let hashedPassword = await bcrypt.hash(password, 10);

    let employee = await prisma.employee.create({
      data: {
        empno,
        password: hashedPassword,
        role: data.role,
        email: data.email,
        name: data.name,
        phone: data.phone,
        zipcode: data.zipcode,
        orgno: data.orgno,
        designation: data.designation,
        signature,
      },
      include: {
        organization: true,
      },
    });

    if (employee) {
      let message = `Greetings from ${employee.organization.name}. Your credentials:<br/><br/>Employee number: ${empno}<br/>Password: ${password}<br/><br/>Please use these credentials to login. We advise you to change your password after first login.
        <br><br> <a href="https://animalize.io/signin?empno=${empno}&password=${password}">Click here to login</a><br><br> Regards, <br> Animalize HQ`;

      await sendMail(
        data.email,
        `Welcome to ${employee.organization.name}!`,
        generalUpdateTemplate("Onboarding", message)
      );

      return {
        success: true,
        message: "Employee created successfully.",
        data: {
          empno,
          password,
        },
      };
    } else {
      return {
        success: false,
        message: "Error creating employee.",
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

export const deleteEmployee = async (empno) => {
  try {
    let employee = await prisma.employee.delete({
      where: {
        empno,
      },
    });

    if (employee) {
      return {
        success: true,
        message: "Employee deleted successfully.",
      };
    } else {
      return {
        success: false,
        message: "Error deleting employee.",
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

export const resetPassword = async (empno) => {
  try {
    let password = randomstring.generate({
      length: 8,
      charset: "alphanumeric",
    });

    let hashedPassword = await bcrypt.hash(password, 10);

    let employee = await prisma.employee.update({
      where: {
        empno,
      },
      data: {
        password: hashedPassword,
      },
    });

    if (employee) {
      let message = `Greetings from Animalize! Your password has been reset successfully.<br><br>Employee no: ${empno}<br>Password: ${password}<br><br>Reagrds<br>Animalize HQ`;

      await sendMail(employee.email, "Password Reset", message);

      return {
        success: true,
        message: "Password reset successfully.",
      };
    } else {
      return {
        success: false,
        message: "Error resetting password.",
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

export const updateEmployee = async (empno, data) => {
  try {
    let employee = await prisma.employee.update({
      where: {
        empno,
      },
      data,
    });

    if (employee) {
      return {
        success: true,
        message: "Employee updated successfully.",
      };
    } else {
      return {
        success: false,
        message: "Error updating employee.",
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

export const updateSignature = async (empno, signature) => {
  try {
    let employee = await prisma.employee.update({
      where: {
        empno,
      },
      data: {
        signature,
      },
    });

    if (employee) {
      return {
        success: true,
        message: "Signature updated successfully.",
      };
    } else {
      return {
        success: false,
        message: "Error updating signature.",
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
