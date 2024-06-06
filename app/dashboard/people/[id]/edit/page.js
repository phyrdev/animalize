import { getEmployeeData } from "@/prisma/employee";
import React from "react";
import EditEmployeeContainer from "./components/EditEmployeeContainer";

async function EditServerPage({ params }) {
  let employee = await getEmployeeData(params.id);
  if (employee.success) {
    return (
      <>
        <EditEmployeeContainer o_employee={employee.data} />
      </>
    );
  }
}

export default EditServerPage;
