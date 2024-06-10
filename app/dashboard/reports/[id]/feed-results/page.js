/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CustomInput from "@/app/dashboard/components/CustomInput";
import PermissionDenied from "@/app/dashboard/components/PermissionDenied";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { getReportById } from "@/prisma/report";
import { testparameteruits } from "@/static/lists";
import { permissions } from "@/static/permissions";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

function FeedResults({ params }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [invalidState, setInvalidState] = useState(false);
  const session = useSession();
  const [values, setValues] = useState({});

  const getReport = async () => {
    let { success, data, message } = await getReportById(params.id);
    if (success) {
      if (data.status == "S201") {
        setReport(data);
        setLoading(false);
      } else {
        setInvalidState(true);
        setLoading(false);
      }
    } else {
      setReport(null);
      setLoading(false);
      toast.error(message);
    }
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      if (permissions.collectSamples.includes(session.data.user.role)) {
        getReport();
      }
    }
  }, [session.status]);

  if (session.status == "authenticated") {
    if (permissions.collectSamples.includes(session.data.user.role) == false) {
      return <PermissionDenied />;
    } else {
      if (report) {
        return (
          <div>
            <div className="px-5 md:px-10 py-5 flex items-center">
              <Breadcrumbs className="hidden md:block">
                <BreadcrumbItem>Dashboard</BreadcrumbItem>
                <BreadcrumbItem>Reports</BreadcrumbItem>
                <BreadcrumbItem>Feed results</BreadcrumbItem>
              </Breadcrumbs>
              <span className="text-xl font-semibold md:hidden">
                Feed results
              </span>

              {permissions.collectSamples.includes(session.data.user.role) && (
                <Button
                  onClick={() => console.log(report)}
                  className="ml-auto w-fit md:px-6 md:ml-auto h-10 rounded-md bg-neutral-800 text-white"
                >
                  Save changes
                </Button>
              )}
            </div>

            {loading == true ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="p-5 md:px-10">
                <details id="auto-fill-dd">
                  <summary>
                    <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                      Patient details
                    </div>
                  </summary>
                  <div className="pt-5 md:pl-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-3xl">
                      <CustomInput
                        label="Report no"
                        value={capitalizeFirstLetter(report.reportno)}
                        readOnly
                      />
                      <CustomInput
                        label="Species"
                        value={capitalizeFirstLetter(report.petSpecies)}
                        readOnly
                      />
                      <CustomInput
                        label="Breed"
                        value={capitalizeFirstLetter(report.petBreed)}
                        readOnly
                      />
                      <CustomInput
                        label="Sex"
                        value={capitalizeFirstLetter(report.petSex)}
                        readOnly
                      />

                      <CustomInput
                        label="D.O.B"
                        type="date"
                        value={
                          new Date(report.petDob).toISOString().split("T")[0]
                        }
                        readOnly
                      />
                      <CustomInput
                        label="Weight"
                        value={report.petWeight}
                        endContent={
                          <span className="text-neutral-500 text-sm">Kg</span>
                        }
                        readOnly
                      />
                    </div>

                    <div className="pb-6 h-14 flex items-center justify-end">
                      <Button onClick={() => {}} className="rounded">
                        Proceed
                      </Button>
                    </div>
                  </div>
                </details>

                <div className="mt-10">
                  <div className="space-y-10">
                    {report.tests.map((test, i) => {
                      return (
                        <details key={i}>
                          <summary>
                            <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                              {test.name}
                            </div>
                          </summary>
                          <div className="overflow-x-auto w-full">
                            {
                              // desktop view
                            }
                            <div className="grid grid-cols-1 gap-7 mt-5 md:pl-5 md:gap-3 min-w-[896px]">
                              {test.parameters.map((param, j) => {
                                return (
                                  <div
                                    key={j}
                                    className="grid grid-cols-5 gap-3"
                                  >
                                    <div className="w-full border h-12 rounded overflow-hidden px-3 flex items-center">
                                      {param.name}
                                    </div>
                                    {param.unit == "boolean" ? (
                                      <div className="w-full border rounded overflow-hidden px-3">
                                        <select
                                          name=""
                                          id=""
                                          className="h-full w-full outline-none cursor-pointer"
                                        >
                                          <option value="true">True</option>
                                          <option value="false">False</option>
                                        </select>
                                      </div>
                                    ) : (
                                      <input
                                        type="text"
                                        placeholder="Observed value"
                                        className="border py-2 px-3 rounded h-12"
                                        value={param.value || ""}
                                        onChange={(e) => {
                                          setReport((prev) => {
                                            let newReport = { ...prev };
                                            newReport.tests[i].parameters[
                                              j
                                            ].value = e.target.value;
                                            return newReport;
                                          });
                                        }}
                                        name=""
                                        id=""
                                      />
                                    )}
                                    <div className="w-full border rounded overflow-hidden px-3 flex items-center">
                                      {param.unit}
                                    </div>
                                    <div className="grid grid-cols-2 gap-1">
                                      <div className="w-full h-12 border rounded overflow-hidden px-3 flex items-center">
                                        {param.low}
                                      </div>
                                      <div className="w-full h-12 border rounded overflow-hidden px-3 flex items-center">
                                        {param.high}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {
                              // mobile view
                            }
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {isConsentOpen && (
              <div className="fixed inset-0 h-full w-full bg-black/50 z-20 flex items-end md:items-center justify-center">
                <div className="w-full md:w-[500px] bg-white md:rounded-md p-5 pb-10 md:pb-5">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={28}
                      height={28}
                      viewBox="0 0 20 20"
                    >
                      <g fill="currentColor">
                        <path d="M10.315 1.852a1.5 1.5 0 0 0-2.629 0L1.127 13.777A1.5 1.5 0 0 0 2.442 16h7.934a7 7 0 0 1-.257-1H2.442a.5.5 0 0 1-.439-.74l6.56-11.926a.5.5 0 0 1 .875 0l3.735 6.79a4.7 4.7 0 0 0 .782-.652z"></path>
                        <path d="M9 6a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0v-4A.5.5 0 0 1 9 6m0 7.5A.75.75 0 1 0 9 12a.75.75 0 0 0 0 1.5m7-3.735q.484.366 1 .582a4.1 4.1 0 0 0 1.6.32c.193 0 .355.143.392.333l.008.084v2.5c0 2.683-1.313 4.506-3.873 5.395a.4.4 0 0 1-.254 0Q13.785 18.6 13 18a4.8 4.8 0 0 1-1.555-2q-.4-.954-.44-2.15L11 13.585v-2.501c0-.23.18-.417.4-.417c1.223 0 2.323-.51 3.318-1.545a.39.39 0 0 1 .566 0q.348.364.716.643"></path>
                      </g>
                    </svg>
                    <span className="text-lg font-medium ml-3">Caution</span>
                    <button
                      onClick={() => setIsConsentOpen(false)}
                      className="ml-auto"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
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

                  <div className="mt-8">
                    <h1 className="text-xl font-semibold">
                      This step is irreversible.
                    </h1>
                    <p className="mt-2 leading-7 text-neutral-600 text-sm md:text-base md:leading-7">
                      You wont be able to access this page once you save the
                      changes
                    </p>
                  </div>

                  <div className="flex items-center justify-end mt-12">
                    <Button
                      onClick={() => setIsConsentOpen(false)}
                      className="rounded-md"
                    >
                      Cancel
                    </Button>
                    <Button className="ml-2 rounded-md bg-neutral-800 text-white">
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      } else {
        if (invalidState) {
          return (
            <div>
              <PermissionDenied
                message={"Sample for this report has already been collected."}
              />
              <div className="px-5 md:px-10"></div>
            </div>
          );
        }
      }
    }
  }
}

export default FeedResults;
