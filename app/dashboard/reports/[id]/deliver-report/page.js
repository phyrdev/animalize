/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import CustomInput from "@/app/dashboard/components/CustomInput";
import PermissionDenied from "@/app/dashboard/components/PermissionDenied";
import { getReportById, markAsDelivered, sendReport } from "@/prisma/report";
import { permissions } from "@/static/permissions";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Result from "../../components/Result";
import { sendMail } from "@/helper/mail";
import { finalReportTemplate } from "@/templates/email";
import Invoice from "../../components/Invoice";
import GlobalState from "@/context/GlobalState";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { calculateAge } from "@/helper/age";

export const maxDuration = 30;

function DeliverReport({ params }) {
  const router = useRouter();
  const session = useSession();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [invalidState, setInvalidState] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [customEmail, setCustomEmail] = useState("");
  const { refreshOrgReports, publish, clientId } = useContext(GlobalState);

  const getReport = async () => {
    let { success, data, message } = await getReportById(params.id);
    if (success) {
      if (data.status == "S203" || data.status == "S205") {
        setReport(data);
        setLoading(false);
        setCustomEmail(data.parentEmail);
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

  const handleSave = async () => {
    toast.loading("Marking report as delivered");
    let { success, message } = await markAsDelivered(report.reportno);
    toast.dismiss();
    if (success) {
      await refreshOrgReports();
      publish(
        JSON.stringify({
          command: "refresh-reports",
          orgno: session.data.user.orgno,
          from: clientId,
          to: "all",
        })
      );
      toast.success(message);
      router.push("/dashboard/reports");
    } else {
      toast.error(message);
    }
  };

  const sendReportToEmail = async (email = null) => {
    toast.loading("Sending email...");
    let reportSendReq = await sendReport(report.reportno, email);
    toast.remove();
    if (reportSendReq.success) {
      toast.success("Email sent successfully");
    } else {
      toast.error("Failed to send email");
    }
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      if (permissions.feedResults.includes(session.data.user.role)) {
        getReport();
      }
    }
  }, [session.status]);

  if (session.status == "authenticated") {
    if (permissions.takeAction.includes(session.data.user.role) == false) {
      return <PermissionDenied />;
    } else {
      if (loading) {
        return (
          <div className="flex items-center justify-center mt-16">
            <Spinner />
          </div>
        );
      } else {
        if (report) {
          return (
            <div>
              <div className="px-5 md:px-10 py-5 flex items-center">
                <Breadcrumbs className="hidden md:block">
                  <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
                  <BreadcrumbItem href="/dashboard/reports">
                    Reports
                  </BreadcrumbItem>
                  <BreadcrumbItem>Deliver report</BreadcrumbItem>
                </Breadcrumbs>
                <span className="text-xl font-semibold md:hidden">Deliver</span>

                {permissions.takeAction.includes(session.data.user.role) && (
                  <Button
                    onClick={() => {
                      handleSave();
                    }}
                    className="ml-auto w-fit md:px-6 md:ml-auto h-10 rounded-md bg-neutral-800 text-white"
                  >
                    Mark as delivered
                  </Button>
                )}
              </div>

              <div className="p-5 md:px-10">
                <details id="delivery-channels" open>
                  <summary>
                    <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                      Delivery channels
                    </div>
                  </summary>
                  <div className="pt-5 md:pl-5">
                    <div className="max-w-3xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <CustomInput
                          label="Email"
                          value={customEmail}
                          onChange={(e) => setCustomEmail(e.target.value)}
                          placeholder={"Recepient's email"}
                        />
                        <div className="flex justify-end md:justify-start">
                          <Button
                            onClick={async () => {
                              if (customEmail.trim().length > 0) {
                                sendReportToEmail(customEmail.trim());
                              } else {
                                toast.error("Email canot be empty");
                              }
                            }}
                            className="h-12 rounded-md w-fit"
                          >
                            Send report
                          </Button>
                        </div>
                      </div>
                      <div className="mt-8 flex flex-wrap gap-2">
                        <Button
                          onClick={() => setShowReport(true)}
                          className="rounded-md bg-transparent border w-fit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="currentColor"
                              fillRule="evenodd"
                              clipRule="evenodd"
                            >
                              <path d="M12.25 2.834c-.46-.078-1.088-.084-2.22-.084c-1.917 0-3.28.002-4.312.14c-1.012.135-1.593.39-2.016.812c-.423.423-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.29v4c0 1.906.002 3.26.14 4.288c.135 1.006.389 1.586.812 2.01c.423.422 1.003.676 2.009.811c1.028.139 2.382.14 4.289.14h4c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.423-.423.677-1.003.812-2.009c.138-1.027.14-2.382.14-4.289v-.437c0-1.536-.01-2.264-.174-2.813h-3.13c-1.133 0-2.058 0-2.79-.098c-.763-.103-1.425-.325-1.954-.854c-.529-.529-.751-1.19-.854-1.955c-.098-.73-.098-1.656-.098-2.79zm1.5.776V5c0 1.2.002 2.024.085 2.643c.08.598.224.891.428 1.094c.203.204.496.348 1.094.428c.619.083 1.443.085 2.643.085h2.02a45.815 45.815 0 0 0-1.17-1.076l-3.959-3.563A37.2 37.2 0 0 0 13.75 3.61m-3.575-2.36c1.385 0 2.28 0 3.103.315c.823.316 1.485.912 2.51 1.835l.107.096l3.958 3.563l.125.112c1.184 1.065 1.95 1.754 2.361 2.678c.412.924.412 1.954.411 3.546v.661c0 1.838 0 3.294-.153 4.433c-.158 1.172-.49 2.121-1.238 2.87c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433V9.945c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.75-.749 1.701-1.08 2.878-1.238c1.144-.153 2.607-.153 4.455-.153h.056z"></path>
                              <path d="M5.453 16.513a.75.75 0 0 1 0-1.026l1.875-2a.75.75 0 1 1 1.094 1.026l-.69.737H11a.75.75 0 1 1 0 1.5H7.731l.691.737a.75.75 0 1 1-1.094 1.026z"></path>
                            </g>
                          </svg>
                          <span>Print report</span>
                        </Button>
                        <Button
                          onClick={() => setShowInvoice(true)}
                          className="rounded-md bg-transparent border w-fit"
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
                              strokeWidth={1.5}
                              d="M4 18.646V8.054c0-2.854 0-4.28.879-5.167C5.757 2 7.172 2 10 2h4c2.828 0 4.243 0 5.121.887C20 3.773 20 5.2 20 8.054v10.592c0 1.511 0 2.267-.462 2.565c-.755.486-1.922-.534-2.509-.904c-.485-.306-.727-.458-.997-.467c-.29-.01-.537.137-1.061.467l-1.911 1.205c-.516.325-.773.488-1.06.488s-.544-.163-1.06-.488l-1.91-1.205c-.486-.306-.728-.458-.997-.467c-.291-.01-.538.137-1.062.467c-.587.37-1.754 1.39-2.51.904C4 20.913 4 20.158 4 18.646M11 11H8m6-4H8"
                              color="currentColor"
                            ></path>
                          </svg>
                          <span>Print invoice</span>
                        </Button>
                        <Button
                          isDisabled={
                            report.parentEmail == null ||
                            report.parentEmail.trim().length == 0
                          }
                          onClick={async () => sendReportToEmail()}
                          className="rounded-md bg-transparent border w-fit"
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
                              strokeWidth={1.5}
                              d="M5 20v-1a7 7 0 0 1 7-7v0a7 7 0 0 1 7 7v1m-7-8a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
                            ></path>
                          </svg>
                          <span>Send to parents email</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </details>

                <details id="patient-details" className="mt-10">
                  <summary>
                    <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                      Patient details
                    </div>
                  </summary>
                  <div className="pt-5 md:pl-5">
                    <div className="max-w-3xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                        <CustomInput
                          onChange={(e) => e.preventDefault()}
                          label="Report no"
                          value={capitalizeFirstLetter(report.reportno)}
                          readOnly
                        />
                        <CustomInput
                          onChange={(e) => e.preventDefault()}
                          label="Name"
                          value={capitalizeFirstLetter(report.petName)}
                          readOnly
                        />
                        <CustomInput
                          onChange={(e) => e.preventDefault()}
                          label="Species"
                          value={capitalizeFirstLetter(report.petSpecies)}
                          readOnly
                        />
                        <CustomInput
                          onChange={(e) => e.preventDefault()}
                          label="Breed"
                          value={capitalizeFirstLetter(report.petBreed)}
                          readOnly
                        />
                        <CustomInput
                          onChange={(e) => e.preventDefault()}
                          label="Sex"
                          value={capitalizeFirstLetter(report.petSex)}
                          readOnly
                        />

                        <CustomInput
                          label="D.O.B"
                          type="text"
                          onChange={(e) => e.preventDefault()}
                          value={
                            report.petDob
                              ? new Date(report.petDob).toDateString()
                              : ""
                          }
                          readOnly
                        />
                        <CustomInput
                          label="Weight"
                          value={report.petWeight}
                          onChange={(e) => e.preventDefault()}
                          endContent={
                            <span className="text-neutral-500 text-sm">Kg</span>
                          }
                          readOnly
                        />
                        <CustomInput
                          label="Age"
                          onChange={(e) => e.preventDefault()}
                          value={
                            report.petAge ||
                            calculateAge(new Date(report.petDob))
                          }
                          readOnly
                        />
                        <div className="md:col-span-2 md:border w-full md:rounded flex h-20 overflow-hidden">
                          <span className="h-full w-24 px-3 border-r bg-neutral-50 flex py-3 text-sm text-neutral-500 shrink-0">
                            Add. notes
                          </span>
                          <textarea
                            className="w-full h-full resize-none p-3 outline-none"
                            placeholder="Residential address"
                            value={report.additionalNotes}
                            onChange={(e) => e.preventDefault()}
                            name=""
                            id=""
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
                <details id="parent-details-dd" className="mt-10">
                  <summary>
                    <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                      Parent details
                    </div>
                  </summary>
                  <div className="pt-5 md:pl-5">
                    <div className="max-w-3xl">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
                        <CustomInput
                          value={report.parentFirstName}
                          readOnly
                          onChange={(e) => {
                            e.preventDefault();
                          }}
                          label="First name"
                          placeholder=""
                        />
                        <CustomInput
                          value={report.parentLastName}
                          readOnly
                          onChange={(e) => {
                            e.preventDefault();
                          }}
                          label="Last name"
                          placeholder=""
                        />
                        <CustomInput
                          value={report.parentEmail}
                          onChange={(e) => e.preventDefault()}
                          readOnly
                          label="Email"
                          placeholder=""
                        />
                        <CustomInput
                          value={report.parentPhone}
                          onChange={(e) => e.preventDefault()}
                          readOnly
                          label="Phone no."
                          placeholder=""
                        />
                        <CustomInput
                          value={report.parentZipcode}
                          onChange={(e) => e.preventDefault()}
                          readOnly
                          label="Zipcode"
                          placeholder=""
                        />
                        <div className="md:col-span-2 md:border w-full md:rounded flex h-20 overflow-hidden">
                          <span className="h-full w-24 px-3 border-r bg-neutral-50 flex py-3 text-sm text-neutral-500 shrink-0">
                            Address
                          </span>
                          <textarea
                            className="w-full h-full resize-none p-3 outline-none"
                            placeholder="Residential address"
                            value={report.parentAddress}
                            onChange={(e) => e.preventDefault()}
                            readOnly
                            name=""
                            id=""
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </div>

              {showInvoice && (
                <Invoice
                  report={report}
                  minimized
                  closeCallback={() => setShowInvoice(false)}
                />
              )}

              {showReport && (
                <Result
                  report={report}
                  closeCallBack={() => setShowReport(false)}
                />
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
}

export default DeliverReport;
