"use server";

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
