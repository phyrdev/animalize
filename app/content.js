/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import GlobalState from "@/context/GlobalState";
import { getEmployees } from "@/prisma/employee";
import { getFacilities } from "@/prisma/facility";
import { getOrgReports } from "@/prisma/report";
import { permissions } from "@/static/permissions";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Content({ children }) {
  const session = useSession();
  const [reports, setReports] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshOrgReports = async () => {
    setLoading(true);
    let { success, data, message } = await getOrgReports(
      session.data.user.orgno
    );
    if (success) {
      setReports(data);
    } else {
      setReports([]);
    }
    setLoading(false);
  };

  const refreshOrgEmployees = async () => {
    if (permissions.manageEmployees.includes(session.data.user.role)) {
      setLoading(true);
      let { success, data, message } = await getEmployees(
        session.data.user.orgno
      );
      if (success) {
        setEmployees(data);
      } else {
        toast.error(message);
      }
      setLoading(false);
    }
  };

  const refreshOrgFacilities = async () => {
    if (permissions.manageFacilities.includes(session.data.user.role)) {
      setLoading(true);
      let { success, data, message } = await getFacilities(
        session.data.user.orgno
      );
      if (success) {
        setFacilities(data);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      refreshOrgReports();
      refreshOrgEmployees();
      refreshOrgFacilities();
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
          facilities,
          setFacilities,
          refreshOrgFacilities,
          loading,
        }}
      >
        {children}
      </GlobalState.Provider>
    </>
  );
}

export default Content;
