/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import PermissionDenied from "@/app/dashboard/components/PermissionDenied";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { getReportById, markSampleCollected } from "@/prisma/report";
import { createVial, deleteVial, getVialsByReport } from "@/prisma/vial";
import { permissions } from "@/static/permissions";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
  Radio,
  RadioGroup,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function CollectSample({ params }) {
  const router = useRouter();
  const [vials, setVials] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [invalidState, setInvalidState] = useState(false);
  const session = useSession();

  const getReport = async () => {
    let { success, data, message } = await getReportById(params.id);
    if (success) {
      if (data.status == "S200") {
        setReport(data);
        setLoading(false);
        getReportVials(data.reportno);
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

  const getReportVials = async (reportno) => {
    let { success, data, message } = await getVialsByReport(reportno);
    if (success) {
      setVials(data);
    } else {
      toast.error(message);
    }
  };

  const createVialForCase = async () => {
    let { success, message, data } = await createVial(
      session.data.user.orgno,
      session.data.user.empno,
      report.reportno
    );
    if (success) {
      toast.success(message);
      setVials([...vials, data]);
    } else {
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
                <BreadcrumbItem>Collect samples</BreadcrumbItem>
              </Breadcrumbs>
              <span className="text-xl font-semibold md:hidden">
                Collect samples
              </span>

              {permissions.collectSamples.includes(session.data.user.role) && (
                <Button
                  onClick={() => setIsConsentOpen(true)}
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
              <div className="p-5 md:p-10">
                <details id="auto-fill-dd">
                  <summary>
                    <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                      Patient information
                    </div>
                  </summary>
                  <div className="pt-5 md:pl-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600">Report no:</span>
                        <span>{report.reportno}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mt-8">
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600">Pet name:</span>
                        <span>{report.petName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600">Pet species:</span>
                        <span>{capitalizeFirstLetter(report.petSpecies)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600">Pet breed:</span>
                        <span>{report.petBreed}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600">Pet sex:</span>
                        <span>{capitalizeFirstLetter(report.petSex)}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600">Pet dob:</span>
                        <span>
                          {new Date(report.petDob).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mt-8">
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600">Parent name:</span>
                        <span>{report.parentFirstName}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-neutral-600">Phone:</span>
                        <span>{report.parentPhone}</span>
                      </div>
                    </div>

                    {report.payment.paymentStatus === "pending" && (
                      <div className="grid grid-cols-3 max-w-3xl mt-16 bg-red-50 p-3">
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-600">
                            Payment status:
                          </span>
                          <span>
                            {capitalizeFirstLetter(
                              report.payment.paymentStatus
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-600">Subtotal:</span>
                          <span>
                            {getCurrencySymbol(report.payment.currency)}
                            {report.payment.subtotal}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-neutral-600">Paid amt:</span>
                          <span>
                            {getCurrencySymbol(report.payment.currency)}
                            {report.payment.paidAmount}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="pb-6 h-14 flex items-center justify-end">
                      <Button onClick={() => {}} className="rounded">
                        Proceed
                      </Button>
                    </div>
                  </div>
                </details>
                <details id="auto-fill-dd" className="mt-10">
                  <summary>
                    <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                      Tests information
                    </div>
                  </summary>
                  <div className="pt-5 md:pl-5">
                    <table className="w-full text-left max-w-3xl">
                      <thead className="bg-neutral-100 border-y">
                        <tr>
                          <th className="font-medium px-5 py-4 text-sm first:pl-10">
                            S.no
                          </th>
                          <th className="font-medium px-5 py-4 text-sm">
                            Item
                          </th>
                          <th className="font-medium px-5 py-4 text-sm">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.tests.map((test, index) => (
                          <tr key={index}>
                            <td className="font-normal px-5 py-3 text-sm first:pl-10">
                              {index + 1}
                            </td>
                            <td className="font-normal px-5 py-3 text-sm">
                              {test.name}
                            </td>
                            <td className="font-normal px-5 py-3 text-sm">
                              {test.duration} hrs
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
                <details id="auto-fill-dd" className="mt-10" open>
                  <summary>
                    <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                      Generate vial labels
                    </div>
                  </summary>
                  <div className="pt-5 md:pl-5">
                    <div>
                      <p className="text-sm text-neutral-600 leading-7">
                        Click on the create label button to generate vial labels
                        for the tests.
                      </p>
                      <Button
                        onClick={async () => createVialForCase()}
                        className="rounded-md mt-5"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 256 256"
                        >
                          <path
                            fill="currentColor"
                            d="M232 48v40a8 8 0 0 1-16 0V56h-32a8 8 0 0 1 0-16h40a8 8 0 0 1 8 8M72 200H40v-32a8 8 0 0 0-16 0v40a8 8 0 0 0 8 8h40a8 8 0 0 0 0-16m152-40a8 8 0 0 0-8 8v32h-32a8 8 0 0 0 0 16h40a8 8 0 0 0 8-8v-40a8 8 0 0 0-8-8M32 96a8 8 0 0 0 8-8V56h32a8 8 0 0 0 0-16H32a8 8 0 0 0-8 8v40a8 8 0 0 0 8 8m48-16a8 8 0 0 0-8 8v80a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8m104 88V88a8 8 0 0 0-16 0v80a8 8 0 0 0 16 0m-40-88a8 8 0 0 0-8 8v80a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8m-32 0a8 8 0 0 0-8 8v80a8 8 0 0 0 16 0V88a8 8 0 0 0-8-8"
                          ></path>
                        </svg>
                        <span>Create label</span>
                      </Button>
                    </div>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {vials.map((vial, index) => {
                        return (
                          <div key={index} className="border rounded-md p-4">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-neutral-500 tracking-wide">
                                ORG-
                                {session.data.user.orgno}
                              </span>
                              <span className="text-sm text-neutral-500 tracking-wide">
                                RP-{report.reportno}
                              </span>
                            </div>
                            <div className="mt-3">
                              <h2 className="text-xl tracking-[3px]">
                                {vial.vialno}
                              </h2>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="text-sm text-neutral-500">
                                {new Date(vial.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                              <Button
                                className="rounded-md bg-neutral-100 ml-auto"
                                isIconOnly
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={20}
                                  height={20}
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M18 16.75h-2a.75.75 0 0 1 0-1.5h2A1.25 1.25 0 0 0 19.25 14v-4A1.25 1.25 0 0 0 18 8.75H6A1.25 1.25 0 0 0 4.75 10v4A1.25 1.25 0 0 0 6 15.25h2a.75.75 0 0 1 0 1.5H6A2.75 2.75 0 0 1 3.25 14v-4A2.75 2.75 0 0 1 6 7.25h12A2.75 2.75 0 0 1 20.75 10v4A2.75 2.75 0 0 1 18 16.75"
                                  ></path>
                                  <path
                                    fill="currentColor"
                                    d="M16 8.75a.76.76 0 0 1-.75-.75V4.75h-6.5V8a.75.75 0 0 1-1.5 0V4.5A1.25 1.25 0 0 1 8.5 3.25h7a1.25 1.25 0 0 1 1.25 1.25V8a.76.76 0 0 1-.75.75m-.5 12h-7a1.25 1.25 0 0 1-1.25-1.25v-7a1.25 1.25 0 0 1 1.25-1.25h7a1.25 1.25 0 0 1 1.25 1.25v7a1.25 1.25 0 0 1-1.25 1.25m-6.75-1.5h6.5v-6.5h-6.5Z"
                                  ></path>
                                </svg>
                              </Button>
                              <Button
                                className="rounded-md bg-red-100 text-red-600"
                                isIconOnly
                                onClick={async () => {
                                  toast.loading("Deleting vial...");
                                  let { success } = await deleteVial(
                                    vial.vialno
                                  );
                                  toast.remove();
                                  if (success) {
                                    let newVials = vials.filter(
                                      (v) => v.vialno !== vial.vialno
                                    );
                                    setVials(newVials);
                                    toast.success("Vial deleted successfully");
                                  } else {
                                    toast.error("Failed to delete vial");
                                  }
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={20}
                                  height={20}
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                                  ></path>
                                </svg>
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </details>
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
                    <Button
                      onClick={async () => {
                        toast.loading("Saving changes...");
                        let { success, message } = await markSampleCollected(
                          report.reportno
                        );
                        toast.remove();
                        if (success) {
                          toast.success(message);
                          router.push("/dashboard/reports");
                          router.refresh();
                        } else {
                          toast.error(message);
                        }
                      }}
                      className="ml-2 rounded-md bg-neutral-800 text-white"
                    >
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

export default CollectSample;
