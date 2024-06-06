import React from "react";
import EditFacilityContainer from "./components/EditFacilityContainer";
import { getFacilityById } from "@/prisma/facility";

async function EditFacility({ params }) {
  let facility = await getFacilityById(params.id);
  if (facility.success) {
    return (
      <div>
        <EditFacilityContainer o_facility={facility.data} />
      </div>
    );
  }
}

export default EditFacility;
