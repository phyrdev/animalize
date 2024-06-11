/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import CustomInput from "@/app/dashboard/components/CustomInput";
import PermissionDenied from "@/app/dashboard/components/PermissionDenied";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { feedResults, getReportById } from "@/prisma/report";
import { testparameteruits } from "@/static/lists";
import { permissions } from "@/static/permissions";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Review({ params }) {
  const router = useRouter();
  const session = useSession();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invalidState, setInvalidState] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);

  const getReport = async () => {
    let { success, data, message } = await getReportById(params.id);
    if (success) {
      if (data.status == "S202") {
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

  const getParamColor = (param) => {
    if (parseFloat(param.value) > parseFloat(param.high)) {
      return "red";
    } else if (parseFloat(param.value) < parseFloat(param.low)) {
      return "blue";
    } else {
      return "inherit";
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
                <BreadcrumbItem>Review</BreadcrumbItem>
              </Breadcrumbs>
              <span className="text-xl font-semibold md:hidden">Review</span>

              <Button
                onClick={() => setIsConsentOpen(true)}
                className="ml-auto w-fit md:px-6 h-10 rounded-md"
              >
                Apply for retest
              </Button>
              <Button
                onClick={() => setApproveOpen(true)}
                className="ml-2 w-fit md:px-6 md:ml-2 h-10 rounded-md bg-neutral-800 text-white"
              >
                Approve results
              </Button>
            </div>

            {loading == true ? (
              <div className="flex items-center justify-center">
                <Spinner />
              </div>
            ) : (
              <div className="p-5 md:px-10">
                <details id="patient-details" open>
                  <summary>
                    <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                      Patient details
                    </div>
                  </summary>
                  <div className="pt-5 md:pl-5">
                    <div className="max-w-3xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
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
                    </div>
                  </div>
                </details>
                <div className="mt-10 max-w-3xl">
                  <div className="space-y-10">
                    {report.tests.map((test, i) => {
                      return (
                        <details key={i} id={`auto-fill-t${i + 1}`} open>
                          <summary>
                            <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                              {test.name}
                            </div>
                          </summary>
                          <div className="md:pl-5 pt-5">
                            <p className="text-sm text-neutral-700 leading-7 md:leading-7">
                              Fill up the observed values for each parameter. If
                              a parameter is not applicable, leave it blank.
                            </p>

                            <div className="mt-8 hidden md:block">
                              <div className="grid grid-cols-4 border divide-x">
                                <div className="font-medium text-neutral-700 h-10 px-3 flex items-center">
                                  <span>Parameter</span>
                                </div>
                                <div className="font-medium text-neutral-700 h-10 px-3 flex items-center">
                                  <span>Observed value</span>
                                </div>
                                <div className="font-medium text-neutral-700 h-10 px-3 flex items-center">
                                  <span>Unit value</span>
                                </div>
                                <div className="font-medium text-neutral-700 grid grid-cols-2 divide-x">
                                  <div className="h-10 px-3 flex items-center">
                                    <span>Low</span>
                                  </div>
                                  <div className="h-10 px-3 flex items-center">
                                    <span>High</span>
                                  </div>
                                </div>
                              </div>
                              <div className="border border-t-0 divide-y">
                                {test.parameters.map((param, j) => {
                                  return (
                                    <div
                                      key={j}
                                      className="grid grid-cols-4 divide-x"
                                    >
                                      <div className="text-neutral-700 h-12 px-3 flex items-center">
                                        <span className="text-base">
                                          {param.name}
                                        </span>
                                      </div>
                                      <div className="text-neutral-700 h-12 px-3 flex items-center">
                                        <span
                                          style={{
                                            color: getParamColor(param),
                                          }}
                                          className="text-base"
                                        >
                                          {param.value || ""}
                                        </span>
                                      </div>
                                      <div className="text-neutral-700 h-12 px-3 flex items-center">
                                        <span className="text-base">
                                          {param.unit}
                                        </span>
                                      </div>
                                      <div className="text-neutral-700 grid grid-cols-2 divide-x">
                                        <div className="h-12 px-3 flex items-center">
                                          <span className="text-base">
                                            {param.low}
                                          </span>
                                        </div>
                                        <div className="h-12 px-3 flex items-center">
                                          <span className="text-base">
                                            {param.high}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="mt-8 max-w-sm md:hidden">
                              <div className="grid grid-cols-4 border divide-x text-sm">
                                <div className="font-medium col-span-2 text-neutral-700 h-10 px-3 flex items-center">
                                  <span>Parameter</span>
                                </div>
                                <div className="font-medium text-neutral-700 h-10 px-3 flex items-center">
                                  <span>Value</span>
                                </div>
                                <div className="font-medium text-neutral-700 h-10 px-3 flex items-center">
                                  <span>Unit</span>
                                </div>
                              </div>
                              <div className="border border-t-0 divide-y">
                                {test.parameters.map((param, j) => {
                                  return (
                                    <div
                                      key={j}
                                      className="grid grid-cols-4 divide-x"
                                    >
                                      <div className="text-neutral-700 col-span-2 h-14 px-3 flex items-center">
                                        <div className="text-sm flex flex-wrap gap-1">
                                          <span>{param.name}</span>&nbsp;
                                          <div className="text-xs text-neutral-500 mt-1">
                                            {param.low} - {param.high}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="text-neutral-700 h-14 flex items-center">
                                        <input
                                          type="text"
                                          value={
                                            report.tests[i].parameters[j]
                                              .value || ""
                                          }
                                          onChange={(e) => {
                                            setReport((prev) => {
                                              let newReport = { ...prev };
                                              newReport.tests[i].parameters[
                                                j
                                              ].value = e.target.value;
                                              return newReport;
                                            });
                                          }}
                                          className="w-full h-full px-3 text-base outline-none focus-within:bg-neutral-50"
                                          name=""
                                          id=""
                                        />
                                      </div>
                                      <div className="text-neutral-700 text-sm h-14 px-3 flex items-center">
                                        <span>{param.unit}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="mt-10">
                              <p className="font-medium">Your observation</p>
                              <textarea
                                name=""
                                id=""
                                value={report.tests[i].observation || ""}
                                onChange={(e) => {
                                  setReport((prev) => {
                                    let newReport = { ...prev };
                                    newReport.tests[i].observation =
                                      e.target.value;
                                    return newReport;
                                  });
                                }}
                                className="w-full border rounded p-4 mt-2"
                                placeholder="Please write your observation"
                              ></textarea>
                            </div>

                            {i != report.tests.length - 1 && (
                              <div className="pb-6 h-14 flex items-center justify-end mt-8">
                                <Button
                                  onClick={() => {
                                    document.getElementById(
                                      `auto-fill-t${i + 1}`
                                    ).open = false;
                                    document.getElementById(
                                      `auto-fill-t${i + 2}`
                                    ).open = true;
                                  }}
                                  className="rounded"
                                >
                                  Proceed
                                </Button>
                              </div>
                            )}
                          </div>
                        </details>
                      );
                    })}
                  </div>
                </div>

                {approveOpen && (
                  <div className="fixed inset-0 h-full w-full bg-black/50 z-20 flex items-end md:items-center justify-center">
                    <div className="w-full md:w-[500px] bg-white md:rounded-md p-5 pb-10 md:pb-5">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={28}
                          height={28}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m11 21l-3.175-2.85q-1.8-1.625-3.088-2.9t-2.125-2.4t-1.225-2.175T1 8.475q0-2.35 1.575-3.912T6.5 3q1.3 0 2.475.538T11 5.075q.85-1 2.025-1.537T15.5 3q2.125 0 3.563 1.288T20.85 7.3q-.5-.2-1.05-.25T18.675 7q-2.125 0-3.9 1.713T13 13q0 1.2.525 2.438T15 17.45q-.475.425-1.237 1.088T12.45 19.7zm6.95-4.825L15.1 13.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4z"
                          ></path>
                        </svg>
                        <span className="text-lg font-medium ml-3">
                          Approve
                        </span>
                        <button
                          onClick={() => setApproveOpen(false)}
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
                          Are you sure you want to approve the results?
                        </h1>
                        <p className="mt-2 leading-7 text-neutral-600 text-sm md:text-base md:leading-7">
                          You wont be able to access this page once you save the
                          changes
                        </p>
                      </div>

                      <div className="flex items-center justify-end mt-12">
                        <Button
                          onClick={() => setApproveOpen(false)}
                          className="rounded-md"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={async () => {}}
                          className="ml-2 rounded-md bg-neutral-800 text-white"
                        >
                          Save changes
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
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

export default Review;
