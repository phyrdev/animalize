/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { getReportByReptNo } from "@/prisma/report";
import { Button, Slider, Spinner } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

function Status({ params }) {
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [active, setActive] = useState(0);

  const steps = [
    {
      code: "S200",
      name: "Waiting for sample collection",
    },
    {
      code: "S201",
      name: "Sample collected and sent to lab",
    },
    {
      code: "S202",
      name: "Awaiting pathology results",
    },
    {
      code: "S203",
      name: "Ready for delivery",
    },

    {
      code: "S205",
      name: "Report delivered successfully",
    },
  ];

  useEffect(() => {
    (async () => {
      let { success, data, message } = await getReportByReptNo(params.id);
      if (success) {
        setReport(data);
        setLoading(false);
        if (data.status == "S204") {
          setActive(3);
          return;
        }
        let step = steps.findIndex(
          (step) => step.code.toString() == data.status.toString()
        );
        setActive(step);
      } else {
        setLoading(false);
        setMessage(message);
        // TODO: add online logging here
      }
    })();
  }, []);

  return (
    <div className="flex md:justify-center bg-neutral-100 min-h-screen w-svw overflow-auto">
      {loading ? (
        <>
          <div className="flex w-full h-fit mt-20 justify-center">
            <Spinner />
          </div>
        </>
      ) : (
        <>
          {report ? (
            <div className="h-fit w-full md:pt-10">
              <div className="max-w-lg bg-white p-5 w-full mx-auto">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-lg font-medium">Report status</h1>
                    <p className="text-sm text-neutral-600 mt-1">
                      Realtime status of your report
                    </p>
                  </div>
                  <img src="/explogo.svg" className="w-24" alt="" />
                </div>
                <div className="mt-6">
                  <div className="grid grid-cols-3 border divide-x">
                    <div className="p-2">
                      <p className="text-sm text-neutral-600">Pet name</p>
                      <p className="mt-1">{report.petName}</p>
                    </div>
                    <div className="p-2">
                      <p className="text-sm text-neutral-600">Species</p>
                      <p className="mt-1">
                        {capitalizeFirstLetter(report.petSpecies)}
                      </p>
                    </div>
                    <div className="p-2">
                      <p className="text-sm text-neutral-600">Breed</p>
                      <p className="mt-1">{report.petBreed}</p>
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-2">
                    <div>
                      <Button
                        onClick={() => {
                          router.push(`/invoice/${params.id}`);
                        }}
                        className="w-full rounded-md bg-neutral-100"
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
                        <span>View invoice</span>
                      </Button>
                    </div>

                    {(report.status == "S205" || report.status == "S203") && (
                      <div className="">
                        <Button
                          onClick={() => {
                            router.push(`/final-report/${report.reportno}`);
                          }}
                          color="primary"
                          className="w-full rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                          >
                            <g fill="none">
                              <path
                                stroke="currentColor"
                                strokeWidth={1.5}
                                d="M13 2.5V5c0 2.357 0 3.536.732 4.268C14.464 10 15.643 10 18 10h4"
                              ></path>
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M6 16h5m0 0l-1.875-2M11 16l-1.875 2"
                              ></path>
                              <path
                                fill="currentColor"
                                d="M2.75 10a.75.75 0 0 0-1.5 0zm18.5 4a.75.75 0 0 0 1.5 0zm-5.857-9.946l-.502.557zm3.959 3.563l-.502.557zm2.302 2.537l-.685.305zM3.172 20.828l.53-.53zm17.656 0l-.53-.53zM1.355 5.927a.75.75 0 0 0 1.493.146zm21.29 12.146a.75.75 0 1 0-1.493-.146zM14 21.25h-4v1.5h4zM2.75 14v-4h-1.5v4zm18.5-.437V14h1.5v-.437zM14.891 4.61l3.959 3.563l1.003-1.115l-3.958-3.563zm7.859 8.952c0-1.689.015-2.758-.41-3.714l-1.371.61c.266.598.281 1.283.281 3.104zm-3.9-5.389c1.353 1.218 1.853 1.688 2.119 2.285l1.37-.61c-.426-.957-1.23-1.66-2.486-2.79zM10.03 2.75c1.582 0 2.179.012 2.71.216l.538-1.4c-.852-.328-1.78-.316-3.248-.316zm5.865.746c-1.086-.977-1.765-1.604-2.617-1.93l-.537 1.4c.532.204.98.592 2.15 1.645zM10 21.25c-1.907 0-3.261-.002-4.29-.14c-1.005-.135-1.585-.389-2.008-.812l-1.06 1.06c.748.75 1.697 1.081 2.869 1.239c1.15.155 2.625.153 4.489.153zM1.25 14c0 1.864-.002 3.338.153 4.489c.158 1.172.49 2.121 1.238 2.87l1.06-1.06c-.422-.424-.676-1.004-.811-2.01c-.138-1.027-.14-2.382-.14-4.289zM14 22.75c1.864 0 3.338.002 4.489-.153c1.172-.158 2.121-.49 2.87-1.238l-1.06-1.06c-.424.422-1.004.676-2.01.811c-1.027.138-2.382.14-4.289.14zm-3.97-21.5c-1.875 0-3.356-.002-4.511.153c-1.177.158-2.129.49-2.878 1.238l1.06 1.06c.424-.422 1.005-.676 2.017-.811c1.033-.138 2.395-.14 4.312-.14zM2.848 6.073c.121-1.234.382-1.9.854-2.371l-1.06-1.06c-.836.834-1.153 1.919-1.287 3.285zm18.304 11.854c-.121 1.234-.383 1.9-.854 2.371l1.06 1.06c.836-.834 1.153-1.919 1.287-3.285z"
                              ></path>
                            </g>
                          </svg>
                          <span>View report</span>
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="mt-10">
                    <p className="font-semibold text-neutral-600">Updates</p>

                    <div className="-space-y-5 mt-6">
                      <div>
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-neutral-800 relative z-10"></div>
                          <span className="ml-2">Case created</span>
                        </div>
                        <div
                          className={`h-10 w-[2px] ml-[5px] -translate-y-2 bg-neutral-500`}
                        ></div>
                      </div>

                      {steps.map((step, index) => {
                        return (
                          <div key={index}>
                            {index != 0 && (
                              <div
                                className={`h-12 w-[2px] ml-[5px] translate-y-2 bg-neutral-200
                                            ${
                                              index <= active
                                                ? "bg-neutral-800"
                                                : "bg-neutral-200"
                                            }
                                    `}
                              ></div>
                            )}
                            <div className="flex items-center">
                              <div
                                className={`h-3 w-3 rounded-full ${
                                  index <= active
                                    ? "bg-neutral-800"
                                    : "bg-neutral-200"
                                } relative z-10`}
                              ></div>
                              <span
                                className={`ml-2 
                                    ${
                                      index <= active
                                        ? "text-neutral-800"
                                        : "text-neutral-400"
                                    }
                                `}
                              >
                                {step.name}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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

export default Status;
