"use server";

import randomstring from "randomstring";
import prisma from "./prisma";
import bcrypt from "bcrypt";

export const generateSuperAdmin = async (orgno) => {
  try {
    let empno = await generateUniqueEmpno();
    let password = randomstring.generate({
      length: 8,
      charset: "alphanumeric",
    });

    password = await bcrypt.hash(password, 10);

    let organization = await prisma.organization.findUnique({
      where: {
        orgno,
      },
    });

    let superAdmin = await prisma.employee.create({
      data: {
        empno,
        password,
        role: "Super Admin",
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
