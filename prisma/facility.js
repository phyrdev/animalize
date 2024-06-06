"use server";

import prisma from "./prisma";

export const createFacility = async (facility) => {
  try {
    await prisma.facility.create({
      data: facility,
    });

    return {
      success: true,
      message: "Facility created successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getFacilities = async (orgno) => {
  try {
    const facilities = await prisma.facility.findMany({
      where: {
        orgno: orgno,
      },
    });

    return {
      success: true,
      data: facilities,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const deleteFacility = async (id) => {
  try {
    await prisma.facility.delete({
      where: {
        id: id,
      },
    });

    return {
      success: true,
      message: "Facility deleted successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const updateFacility = async (id, facility) => {
  try {
    await prisma.facility.update({
      where: {
        id: id,
      },
      data: facility,
    });

    return {
      success: true,
      message: "Facility updated successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getFacilityById = async (id) => {
  try {
    const facility = await prisma.facility.findUnique({
      where: {
        id: id,
      },
    });

    return {
      success: true,
      data: facility,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
