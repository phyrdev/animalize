import { getReportById } from "@/prisma/report";
import React from "react";
import EditReportContainer from "./components/EditReportContainer";

async function EditReportServer({ params }) {
  const report = await getReportById(params.id);
  if (report.success) {
    return (
      <>
        <div>
          <EditReportContainer report={report.data} />
        </div>
      </>
    );
  } else {
    return <div>{report.message}</div>;
  }
}

export default EditReportServer;
