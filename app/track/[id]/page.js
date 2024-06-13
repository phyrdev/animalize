/* eslint-disable @next/next/no-img-element */
"use client";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { getReportByReptNo } from "@/prisma/report";
import { Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

function Status({ params }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice-${report?.reportno}`,
  });

  useEffect(() => {
    (async () => {
      let { success, data, message } = await getReportByReptNo(params.id);
      console.log(success);
      if (success) {
        setReport(data);
        setLoading(false);
      } else {
        setLoading(false);
        setMessage(message);
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
            <div className="h-fit w-full pt-10">
              <div className="max-w-lg bg-white p-5 w-full mx-auto flex items-center justify-between">
                <h1 className="text-xl font-medium">Report status</h1>
                <img src="/explogo.svg" className="w-32" alt="" />
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
