/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import GlobalState from "@/context/GlobalState";
import { getEmployees } from "@/prisma/employee";
import { getFacilities } from "@/prisma/facility";
import { getIssues } from "@/prisma/issue";
import { getOrgPayments } from "@/prisma/payments";
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
  const [payments, setPayments] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshOrgReports = async () => {
    setLoading(true);
    let { success, data, message } = await getOrgReports(
      session.data.user.orgno
    );
    if (success) {
      setReports(data);
      refreshOrgPayments();
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

  const refreshOrgPayments = async () => {
    if (permissions.managePayments.includes(session.data.user.role)) {
      setLoading(true);
      let { success, data, message } = await getOrgPayments(
        session.data.user.orgno
      );

      if (success) {
        setPayments(data);
      }

      setLoading(false);
    }
  };

  const refreshOrgIssues = async () => {
    if (permissions.manageIssues.includes(session.data.user.role)) {
      setLoading(true);
      let { success, data, message } = await getIssues(session.data.user.orgno);
      if (success) {
        setIssues(data);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      refreshOrgReports();
      refreshOrgEmployees();
      refreshOrgFacilities();
      refreshOrgIssues();
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
          payments,
          setPayments,
          refreshOrgPayments,
          issues,
          setIssues,
          refreshOrgIssues,
          loading,
        }}
      >
        {children}
      </GlobalState.Provider>
    </>
  );
}

export default Content;
