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
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function Review({ params }) {
  const router = useRouter();
  const uploadSignatureRef = useRef(null);
  const session = useSession();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invalidState, setInvalidState] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [addSigntureOpen, setAddSigntureOpen] = useState(false);

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
        console.log(session.data.user);
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

                {true && (
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
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M22 12.634c-4 3.512-4.572-2.013-6.65-1.617c-2.35.447-3.85 5.428-2.35 5.428s-.5-5.945-2.5-3.89s-2.64 4.74-4.265 2.748C-1.5 5.813 5-1.15 8.163 3.457C10.165 6.373 6.5 16.977 2 22m7-1h10"
                            color="currentColor"
                          ></path>
                        </svg>
                        <span className="text-lg font-medium ml-3">
                          Signature
                        </span>
                      </div>

                      <div className="mt-8">
                        <h1 className="text-xl font-semibold">
                          You have not added your signature.
                        </h1>
                        <p className="text-sm text-neutral-600 mt-2">
                          Accepted formats .png, .jpg, .jpeg, files
                        </p>

                        <Button
                          onClick={() => {
                            uploadSignatureRef.current.click();
                          }}
                          className="rounded mt-5"
                        >
                          <input
                            ref={uploadSignatureRef}
                            type="file"
                            hidden
                            name=""
                            id=""
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M7.598 4.487c.267-1.31 1.433-2.237 2.768-2.237h3.268c1.335 0 2.5.927 2.768 2.237a.656.656 0 0 0 .62.524h.033c1.403.062 2.481.234 3.381.825c.567.372 1.055.85 1.435 1.409c.473.694.681 1.492.781 2.456c.098.943.098 2.124.098 3.62v.085c0 1.496 0 2.678-.098 3.62c-.1.964-.308 1.762-.781 2.457a5.155 5.155 0 0 1-1.435 1.409c-.703.461-1.51.665-2.488.762c-.958.096-2.159.096-3.685.096H9.737c-1.526 0-2.727 0-3.685-.096c-.978-.097-1.785-.3-2.488-.762a5.155 5.155 0 0 1-1.435-1.41c-.473-.694-.681-1.492-.781-2.456c-.098-.942-.098-2.124-.098-3.62v-.085c0-1.496 0-2.677.098-3.62c.1-.964.308-1.762.781-2.456a5.155 5.155 0 0 1 1.435-1.41c.9-.59 1.978-.762 3.381-.823l.017-.001h.016a.656.656 0 0 0 .62-.524m2.768-.737c-.64 0-1.177.443-1.298 1.036c-.195.96-1.047 1.716-2.072 1.725c-1.348.06-2.07.225-2.61.579a3.665 3.665 0 0 0-1.017.999c-.276.405-.442.924-.53 1.767c-.088.856-.089 1.96-.089 3.508s0 2.651.09 3.507c.087.843.253 1.362.53 1.768c.268.394.613.734 1.017.999c.417.273.951.438 1.814.524c.874.087 2 .088 3.577.088h4.444c1.576 0 2.702 0 3.577-.088c.863-.086 1.397-.25 1.814-.524c.404-.265.75-.605 1.018-1c.276-.405.442-.924.53-1.767c.088-.856.089-1.96.089-3.507c0-1.548 0-2.652-.09-3.508c-.087-.843-.253-1.362-.53-1.767a3.655 3.655 0 0 0-1.017-1c-.538-.353-1.26-.518-2.61-.578c-1.024-.01-1.876-.764-2.071-1.725a1.314 1.314 0 0 0-1.298-1.036zm1.634 7a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M8.25 13a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m9-3a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span>Add signature</span>
                        </Button>
                      </div>

                      <div className="flex items-center justify-end mt-12">
                        <Button
                          onClick={async () => {}}
                          className="ml-2 rounded-md bg-neutral-800 text-white"
                        >
                          Save signature
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
