/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import GlobalState from "@/context/GlobalState";
import { getEmployees } from "@/prisma/employee";
import { getOrgReports } from "@/prisma/report";
import { permissions } from "@/static/permissions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Content({ children }) {
  const session = useSession();
  const [reports, setReports] = useState([]);
  const [employees, setEmployees] = useState([]);

  const refreshOrgReports = async () => {
    let { success, data, message } = await getOrgReports(
      session.data.user.orgno
    );
    if (success) {
      console.log(data);
      setReports(data);
    } else {
      setReports([]);
    }
  };

  const refreshOrgEmployees = async () => {
    let { success, data, message } = await getEmployees(
      session.data.user.orgno
    );
    if (success) {
      setEmployees(data);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      refreshOrgReports();
      if (permissions.manageEmployees.includes(session.data.user.role)) {
        refreshOrgEmployees();
      }
    }
  }, [session.status]);
  return (
    <>
      <GlobalState.Provider
        value={{
          reports,
          setReports,
          refreshOrgReports,
          employees,
          setEmployees,
          refreshOrgEmployees,
        }}
      >
        {children}
      </GlobalState.Provider>
    </>
  );
}

export default Content;
