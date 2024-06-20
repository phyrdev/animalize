/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Spinner,
  Progress,
  Calendar,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { permissions } from "@/static/permissions";
import { getOrgReports } from "@/prisma/report";
import PermissionDenied from "../components/PermissionDenied";
import RRow from "./components/RRow";
import RCard from "./components/RCard";
import { reportstatus } from "@/static/lists";
import GlobalState from "@/context/GlobalState";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { CalendarDate, parseDate, today } from "@internationalized/date";

export const maxDuration = 30;

function Reports() {
  const router = useRouter();
  const session = useSession();
  const [visibleReports, setVisibleReports] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchVialOpen, setSearchVialOpen] = useState(false);
  const [searchCalendarOpen, setSearchCalendarOpen] = useState(false);
  const [searchByDateFilerOn, setSearchByDateFilterOn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchVialQuery, setSearchVialQuery] = useState("");
  const [searchDate, setSearchDate] = useState(today());
  const { reports, refreshOrgReports, loading } = useContext(GlobalState);

  useEffect(() => {
    if (session.status == "authenticated") {
      if (permissions.viewReports.includes(session.data.user.role)) {
        setVisibleReports(reports);
      }
    }
  }, [reports, session.status]);

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

  useEffect(() => {
    if (searchVialQuery == "") {
      setVisibleReports(reports);
    } else {
      let filteredReports = reports.filter((report) => {
        let vials = report.vials;
        let vialFound = false;
        vials.forEach((vial) => {
          if (vial.vialno.includes(searchVialQuery)) {
            vialFound = true;
          }
        });
        return vialFound;
      });
      setVisibleReports(filteredReports);
    }
  }, [searchVialQuery]);

  if (session.status == "authenticated") {
    if (permissions.viewReports.includes(session.data.user.role) == false) {
      return <PermissionDenied />;
    } else {
      return (
        <div>
          <div className="px-5 md:px-10 py-5 flex items-center">
            <Breadcrumbs className="hidden md:block">
              <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
              <BreadcrumbItem href="/dashboard/reports">Reports</BreadcrumbItem>
            </Breadcrumbs>
            <span className="text-xl font-semibold md:hidden">Reports</span>

            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  className="ml-auto w-fit rounded-md bg-neutral-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 48 48"
                  >
                    <g fill="none">
                      <path
                        stroke="currentColor"
                        strokeLinejoin="round"
                        strokeWidth={4}
                        d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
                      ></path>
                      <circle
                        cx={14}
                        cy={24}
                        r={3}
                        fill="currentColor"
                      ></circle>
                      <circle
                        cx={24}
                        cy={24}
                        r={3}
                        fill="currentColor"
                      ></circle>
                      <circle
                        cx={34}
                        cy={24}
                        r={3}
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                onAction={(key) => {
                  switch (key) {
                    case "search-report-no":
                      setSearchVialOpen(false);
                      setSearchVialQuery("");
                      setSearchOpen(!searchOpen);
                      setVisibleReports(reports);
                      setSearchQuery("");
                      setSearchByDateFilterOn(false);
                      setSearchCalendarOpen(false);
                      setSearchDate(today());
                      break;
                    case "search-vial-no":
                      setSearchOpen(false);
                      setSearchQuery("");
                      setSearchVialOpen(!searchVialOpen);
                      setVisibleReports(reports);
                      setSearchVialQuery("");
                      setSearchByDateFilterOn(false);
                      setSearchCalendarOpen(false);
                      setSearchDate(today());
                      break;
                    case "search-by-date":
                      setSearchCalendarOpen(!searchCalendarOpen);
                      break;
                    case "regresh-reports":
                      refreshOrgReports();
                      break;
                  }
                }}
                aria-label="Static Actions"
              >
                <DropdownItem key="search-report-no">
                  Search by report no.
                </DropdownItem>
                <DropdownItem key="search-vial-no">
                  Search by vial no.
                </DropdownItem>
                <DropdownItem key="search-by-date">Search by date</DropdownItem>
                <DropdownItem key="regresh-reports">
                  Refresh reports
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

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

          {loading && (
            <Progress
              radius="none"
              size="sm"
              classNames={{
                indicator: "bg-neutral-600 h-1",
              }}
              isIndeterminate
            />
          )}
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
                placeholder="Search for a report number..."
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
          {searchVialOpen && (
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
                placeholder="Search for a vial number..."
                value={searchVialQuery}
                onChange={(e) => setSearchVialQuery(e.target.value)}
                className="bg-transparent text-sm outline-none h-full w-full ml-3"
                name=""
              />
              <button
                onClick={() => {
                  setSearchVialOpen(false);
                  setVisibleReports(reports);
                  setSearchVialQuery("");
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
          {searchByDateFilerOn && (
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
              <p
                onClick={() => setSearchCalendarOpen(true)}
                className="text-sm ml-3 cursor-pointer"
              >
                Showing {visibleReports.length} results for{" "}
                <span className="text-blue-500">
                  {new Date(searchDate.toDate()).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </p>
              <button
                className="ml-auto"
                onClick={() => {
                  setSearchCalendarOpen(false);
                  setSearchByDateFilterOn(false);
                  setVisibleReports(reports);
                  setSearchDate(today());
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

          {searchCalendarOpen && (
            <div className="fixed inset-0 h-full w-full z-20 bg-black/50 flex items-center justify-center">
              <div className="w-[97%] md:w-[450px] bg-white rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">Choose a date</h2>
                    <p className="text-sm mt-2 text-neutral-700 leading-6">
                      Select a date to filter reports created on that date.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchCalendarOpen(false);
                      setSearchByDateFilterOn(false);
                      setVisibleReports(reports);
                      setSearchDate(today());
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                        d="M368 368L144 144m224 0L144 368"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="mt-7 flex justify-center">
                  <Calendar
                    aria-label="Date (Show Month and Year Picker)"
                    showMonthAndYearPickers
                    className="shadow-none border"
                    onChange={(date) => setSearchDate(date)}
                    value={searchDate}
                  />
                </div>

                <div className="flex justify-between mt-8">
                  <div className="flex items-center w-fit text-sm">
                    <span className="text-neutral-600 mr-1">
                      Searching for{" "}
                    </span>
                    <span className="text-blue-500">
                      {new Date(searchDate.toDate()).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <Button
                    onClick={() => {
                      let filteredReports = reports.filter((report) => {
                        let reportDate = new Date(
                          report.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        });
                        let searchDate_ = new Date(
                          searchDate.toDate()
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        });
                        return reportDate == searchDate_;
                      });

                      setVisibleReports(filteredReports);
                      setSearchCalendarOpen(false);
                      setSearchByDateFilterOn(true);
                    }}
                    className="rounded-md bg-neutral-900 text-white"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>
          )}

          {reports.length != 0 && (
            <>
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
                    {visibleReports.map((report, index) => {
                      let statusOption = reportstatus[report.status];
                      if (
                        statusOption.access.includes(session.data.user.role)
                      ) {
                        return (
                          <RRow
                            key={index}
                            report={report}
                            index={index}
                            flagCallback={refreshOrgReports}
                          />
                        );
                      }
                    })}
                  </tbody>
                </table>
              </div>

              <div className="px-5 md:hidden mt-5">
                <div className="flex items-center text-sm text-neutral-600">
                  <span>0-24 of 100 reports</span>
                </div>

                <ul className="mt-5 space-y-3">
                  {visibleReports.map((report, index) => {
                    let statusOption = reportstatus[report.status];
                    if (statusOption.access.includes(session.data.user.role)) {
                      return (
                        <RCard
                          key={index}
                          report={report}
                          index={index}
                          flagCallback={refreshOrgReports}
                        />
                      );
                    }
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
