/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Spinner,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { permissions } from "@/static/permissions";
import { getOrgReports } from "@/prisma/report";
import PermissionDenied from "../components/PermissionDenied";
import RRow from "./components/RRow";
import RCard from "./components/RCard";
function Reports() {
  const router = useRouter();
  const session = useSession();
  const [reports, setReports] = useState([]);
  const [visibleReports, setVisibleReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const getOrganizationReports = async () => {
    let { success, data, message } = await getOrgReports(
      session.data.user.orgno
    );
    if (success) {
      setReports(data);
      setVisibleReports(data);
      setLoading(false);
    } else {
      setReports([]);
      setVisibleReports([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      if (permissions.createReport.includes(session.data.user.role)) {
        if (reports.length == 0) {
          getOrganizationReports();
        }
      }
    }
  }, [session.status]);

  useEffect(() => {
    if (searchQuery == "") {
      setVisibleReports(reports);
    } else {
      let filteredEmployees = reports.filter((report) => {
        return (
          report.reportno.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.petName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
      setVisibleReports(filteredEmployees);
    }
  }, [searchQuery]);

  if (session.status == "authenticated") {
    if (permissions.createReport.includes(session.data.user.role) == false) {
      return <PermissionDenied />;
    } else {
      return (
        <div>
          <div className="px-5 md:px-10 py-5 flex items-center">
            <Breadcrumbs className="hidden md:block">
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
              <BreadcrumbItem>Reports</BreadcrumbItem>
            </Breadcrumbs>
            <span className="text-xl font-semibold md:hidden">Reports</span>
            <Button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setVisibleReports(reports);
                setSearchQuery("");
              }}
              isIconOnly
              className="ml-auto rounded-md bg-neutral-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.55}
                  d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                ></path>
              </svg>
            </Button>

            {permissions.createReport.includes(session.data.user.role) && (
              <Button
                onClick={() => {
                  router.push("/dashboard/reports/create");
                }}
                className="ml-3 w-fit md:px-6 md:ml-5 h-10 rounded-md bg-neutral-800 text-white"
              >
                Create report
              </Button>
            )}
          </div>
          {loading == true ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              {searchOpen && (
                <div className="h-12 border-y md:border-b-0 flex items-center px-5 md:px-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    className="shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.55}
                      d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                    ></path>
                  </svg>
                  <input
                    type="text"
                    id="search-input"
                    placeholder="Search for a report..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm outline-none h-full w-full ml-3"
                    name=""
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setVisibleReports(reports);
                      setSearchQuery("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 36 36"
                    >
                      <path
                        fill="currentColor"
                        d="m19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41Z"
                        className="clr-i-outline clr-i-outline-path-1"
                      ></path>
                      <path fill="none" d="M0 0h36v36H0z"></path>
                    </svg>
                  </button>
                </div>
              )}
              <div className="hidden md:block whitespace-nowrap overflow-auto shrink-0 pb-24">
                <table className="w-fit lg:w-full text-left">
                  <thead className="bg-neutral-100 border-y">
                    <tr>
                      <th className="font-medium px-5 py-4 text-sm first:pl-10">
                        S. no.
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Report no.
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Date created
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Pet name
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Report status
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Payment status
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">Action</th>
                      <th className="font-medium px-5 py-4 text-sm"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleReports.map((report, index) => (
                      <RRow
                        key={index}
                        report={report}
                        index={index}
                        flagCallback={getOrganizationReports}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-5 md:hidden mt-5">
                <div className="flex items-center text-sm text-neutral-600">
                  <span>0-24 of 100 reports</span>
                </div>

                <ul className="mt-5 space-y-3">
                  {visibleReports.map((report, index) => {
                    return (
                      <RCard
                        key={index}
                        report={report}
                        index={index}
                        flagCallback={getOrganizationReports}
                      />
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      );
    }
  }
}

export default Reports;
