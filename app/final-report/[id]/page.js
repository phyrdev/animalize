/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { capitalizeFirstLetter } from "@/helper/refactor";
import React, { useEffect, useRef, useState } from "react";
import { getReportByReptNo } from "@/prisma/report";
import { Button, Spinner } from "@nextui-org/react";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

function FinalReport({ params }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onPrintError: (error) => toast.error(error.message),
    documentTitle: `Invoice-${report?.reportno}`,
  });

  //   const handlePrint = async () => {
  //     let reportCards = document.querySelectorAll(".report-card");
  //     let pdf = new jsPDF("p", "mm", "a4");
  //     await html2canvas(reportCards[0]).then((canvas) => {
  //       pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 0, 0);
  //     });
  //     pdf.save(`Report-${report?.reportno}.pdf`);
  //   };

  useEffect(() => {
    (async () => {
      let { success, data, message } = await getReportByReptNo(params.id);
      if (success) {
        if (data.status != "S203" && data.status != "S205") {
          setMessage("Report is not ready for final report");
          setLoading(false);

          return;
        } else {
          setReport(data);
          setLoading(false);
          // check if opened in webview

          if (window.ReactNativeWebView) {
            toast.error("Please open in browser to print the report");
          } else if (window.navigator.userAgent.includes("Instagram")) {
            toast.error("Please open in browser to print the report");
          } else if (window.navigator.userAgent.includes("Gmail")) {
            toast.error("Please open in browser to print the report");
          }
          setTimeout(() => {
            handlePrint();
          }, 1000);
        }
      } else {
        //TODO: add online logging here
        setLoading(false);
        setMessage(message);
      }
    })();
  }, []);

  const getParamColor = (param) => {
    if (parseFloat(param.value) > parseFloat(param.high)) {
      return "red";
    } else if (parseFloat(param.value) < parseFloat(param.low)) {
      return "blue";
    } else {
      return "inherit";
    }
  };

  return (
    <div>
      {loading ? (
        <>
          <div className="flex w-full h-fit mt-20 justify-center">
            <Spinner />
          </div>
        </>
      ) : (
        <>
          {report ? (
            <div className="w-full bg-neutral-100 min-h-svh">
              <div className="h-fit w-fit fixed top-0 -translate-y-full">
                <div className="mt-5">
                  <Button className="rounded-md" onClick={handlePrint}>
                    Print invoice
                  </Button>
                </div>
                <div
                  ref={componentRef}
                  className="w-[896px] bg-white h-fit px-10"
                >
                  <div className="mt-10 space-y-16">
                    {report.tests.map((test, i) => {
                      return (
                        <div key={i} className="relative report-card">
                          <div className="h-16 w-16 absolute top-0 right-0">
                            <QRCode
                              size={256}
                              style={{
                                height: "auto",
                                maxWidth: "100%",
                                width: "100%",
                              }}
                              value={report.reportno}
                              viewBox={`0 0 256 256`}
                            />
                          </div>
                          <img src="/explogo.svg" className="w-32" alt="" />
                          <div className="text-neutral-600 text-sm flex mt-6">
                            <span className="font-medium text-neutral-700">
                              Report no:
                            </span>
                            <span className="ml-2">{report.reportno}</span>
                          </div>
                          <div className="grid grid-cols-3 mt-5">
                            <div className="space-y-3 text-sm text-neutral-600">
                              <p>
                                Pet name:{" "}
                                <span className="text-black">
                                  {report.petName}
                                </span>
                              </p>
                              <p>
                                Species:{" "}
                                <span className="text-black">
                                  {capitalizeFirstLetter(report.petSpecies)}
                                </span>
                              </p>
                              <p>
                                Breed:{" "}
                                <span className="text-black">
                                  {capitalizeFirstLetter(report.petBreed)}
                                </span>
                              </p>
                              <p>
                                D.O.B:{" "}
                                <span className="text-black">
                                  {new Date(report.petDob).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </p>
                            </div>
                            <div className="space-y-3 text-sm text-neutral-600">
                              <p>
                                Parent name:{" "}
                                <span className="text-black">
                                  {report.parentFirstName}
                                </span>
                              </p>
                              <p>
                                Email:{" "}
                                <span className="text-black">
                                  {report.parentEmail}
                                </span>
                              </p>
                              <p>
                                Phone:{" "}
                                <span className="text-black">
                                  {report.parentPhone}
                                </span>
                              </p>
                            </div>
                            <div className="space-y-3 text-sm text-neutral-600">
                              <span className="text-black block font-medium">
                                Lenus Vet labs
                              </span>
                              <span className="text-black block">
                                lenuslabs@gmail.com
                              </span>
                              <span className="text-black block">
                                7735592041
                              </span>
                            </div>
                          </div>
                          <div className="border mt-8">
                            <h1 className="font-medium border-b py-3 text-base text-center cursor-pointer select-none w-full bg-neutral-100">
                              {test.name}
                            </h1>
                            <div className="">
                              <div className="">
                                <div className="grid grid-cols-4 border-y border-t-0 divide-x text-sm">
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
                                <div className="">
                                  {test.parameters.map((param, j) => {
                                    return (
                                      <div key={j} className="grid grid-cols-4">
                                        <div className="text-neutral-700 h-9 px-3 flex items-center">
                                          <span className="text-sm">
                                            {param.name}
                                          </span>
                                        </div>
                                        <div className="text-neutral-700 h-9 px-3 flex items-center">
                                          <span
                                            style={{
                                              color: getParamColor(param),
                                            }}
                                            className="text-sm"
                                          >
                                            {param.value || ""}
                                          </span>
                                        </div>
                                        <div className="text-neutral-700 h-9 px-3 flex items-center">
                                          <span className="text-sm">
                                            {param.unit}
                                          </span>
                                        </div>
                                        <div className="text-neutral-700 grid grid-cols-2">
                                          <div className="h-9 px-3 flex items-center">
                                            <span className="text-sm">
                                              {param.low}
                                            </span>
                                          </div>
                                          <div className="h-9 px-3 flex items-center">
                                            <span className="text-sm">
                                              {param.high}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-6">
                            <p className="text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={28}
                                height={28}
                                className="inline-block mr-2"
                                viewBox="0 0 15 15"
                              >
                                <path
                                  fill="currentColor"
                                  d="M5.5 7A2.5 2.5 0 0 1 3 4.5v-2a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v2a3.49 3.49 0 0 0 1.51 2.87A4.41 4.41 0 0 1 5 10.5a3.5 3.5 0 1 0 7 0v-.57a2 2 0 1 0-1 0v.57a2.5 2.5 0 0 1-5 0a4.41 4.41 0 0 1 1.5-3.13A3.49 3.49 0 0 0 9 4.5v-2A1.5 1.5 0 0 0 7.5 1H7a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v2A2.5 2.5 0 0 1 5.5 7m6 2a1 1 0 1 1 0-2a1 1 0 0 1 0 2"
                                ></path>
                              </svg>
                              <span className="font-medium text-neutral-600">
                                Interpretation:
                              </span>{" "}
                              {test.observation}
                            </p>
                          </div>
                          <div className="mt-10 flex flex-wrap gap-24">
                            <div>
                              <img
                                className="w-[200px] h-[80px]"
                                src={report.reviewedBy?.signature || ""}
                                alt=""
                              />
                              <div className="flex items-center">
                                <span>Dr. {report.reviewedBy?.name}</span>
                                <span className="text-neutral-600 ml-3">
                                  (
                                  {report.reviewedBy?.designation ||
                                    report.reviewedBy?.role}
                                  )
                                </span>
                              </div>
                              <p className="mt-2 text-neutral-600 text-sm">
                                Reviewed on:
                                <span className="text-black ml-2">
                                  {new Date(
                                    report.reviewedAt
                                  ).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  })}
                                </span>
                              </p>
                              <p className="text-sm text-neutral-600 mt-2">
                                Pathologist
                              </p>
                            </div>
                            <div>
                              <img
                                className="w-[200px] h-[80px]"
                                src={report.resultsFedBy?.signature || ""}
                                alt=""
                              />
                              <div className="flex items-center">
                                <span>{report.resultsFedBy?.name}</span>
                              </div>
                              <p className="text-sm text-neutral-600 mt-2">
                                Lab technician
                              </p>
                            </div>
                          </div>
                          <footer></footer>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="w-full bg-white max-w-lg mx-auto pt-7 pb-5">
                <img src="/explogo.svg" className="w-36 mx-auto" alt="" />
                <div className="flex items-center justify-between border-y border-dashed py-2 px-5 mt-7 text-sm">
                  <span>
                    {new Date(report.createdAt).toDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                  <span>Report</span>
                  <span>{report.reportno}</span>
                </div>
                <div className="mt-10 px-5">
                  <p className="leading-7 text-sm text-neutral-700">
                    Your report is ready for download. Please click the button
                    below to print / download the report. If you have any issues
                    or concerns, please contact us at{" "}
                    <a
                      className="text-blue-500"
                      href={`mailto:${report.organization.email}`}
                    >
                      {report.organization.email}
                    </a>
                  </p>

                  <p className="leading-7 text-sm text-neutral-700 mt-5">
                    You can also get a physical copy of the report by visiting
                    our office.
                  </p>

                  <div className="flex items-center mt-10">
                    <Button className="rounded-md w-fit" onClick={handlePrint}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.5"
                          color="currentColor"
                        >
                          <path d="M7.354 18c-2.123 0-3.185 0-3.94-.453a3.04 3.04 0 0 1-1.15-1.223c-.392-.77-.287-1.787-.075-3.822c.176-1.698.264-2.547.698-3.171c.285-.41.67-.745 1.121-.977C4.695 8 5.582 8 7.354 8h9.292c1.772 0 2.659 0 3.346.354c.451.232.836.567 1.121.977c.434.624.522 1.473.698 3.172c.212 2.034.317 3.052-.076 3.821a3.04 3.04 0 0 1-1.148 1.223C19.83 18 18.769 18 16.646 18M17 8V6c0-1.886 0-2.828-.586-3.414S14.886 2 13 2h-2c-1.886 0-2.828 0-3.414.586S7 4.114 7 6v2" />
                          <path d="M13.989 16H10.01c-.685 0-1.028 0-1.32.109a1.87 1.87 0 0 0-.945.8c-.168.281-.251.642-.417 1.363c-.26 1.128-.39 1.691-.301 2.143c.117.602.484 1.112.995 1.382c.382.203.918.203 1.988.203h3.978c1.07 0 1.606 0 1.988-.203c.51-.27.878-.78.995-1.382c.089-.452-.041-1.015-.3-2.143c-.167-.72-.25-1.082-.418-1.362a1.87 1.87 0 0 0-.946-.801C15.017 16 14.674 16 13.988 16M18 12h.009" />
                        </g>
                      </svg>
                      <span>Print report</span>
                    </Button>
                  </div>

                  <p className="text-sm mt-5 leading-6">
                    Please make sure that your browser supports printing & is
                    not opened in webview mode.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <>{message}</>
          )}
        </>
      )}
    </div>
  );
}

export default FinalReport;
