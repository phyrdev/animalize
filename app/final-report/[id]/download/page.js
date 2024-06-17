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
        }
      } else {
        //TODO: add online logging here
        setLoading(false);
        setMessage(message);
      }
    })();
  }, []);

  useEffect(() => {
    if (report) {
    }
  }, [report]);

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
            <div className="w-full">
              <div className="h-fit w-fit">
                <div className="w-[896px] bg-white h-fit px-10">
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
