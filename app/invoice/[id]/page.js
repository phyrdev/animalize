/* eslint-disable @next/next/no-img-element */
"use client";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { getReportByReptNo } from "@/prisma/report";
import { Button, Spinner } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

function Invoice({ params }) {
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
            <div className="w-full">
              <div className="h-fit w-fit fixed top-0 -translate-y-full">
                <div className="mt-5">
                  <Button className="rounded-md" onClick={handlePrint}>
                    Print invoice
                  </Button>
                </div>
                <div
                  ref={componentRef}
                  className="p-10 leading-8 relative w-[896px] bg-white h-fit mt-5"
                >
                  <img src="/explogo.svg" className="w-32" alt="" />
                  <div className="text-neutral-600 text-sm flex mt-6">
                    <span className="font-medium text-neutral-700">
                      Report no:
                    </span>
                    <span className="ml-2">{report.reportno}</span>
                  </div>

                  <div className="h-16 w-16 absolute top-10 right-10">
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

                  <div className="mt-10">
                    <h1 className="text-4xl font-light tracking-[2px] text-neutral-800">
                      INVOICE
                    </h1>

                    <div className="grid grid-cols-2 mt-8">
                      <div>
                        <h2 className="text-base font-medium text-neutral-700">
                          Billed to
                        </h2>
                        <p className="mt-4 text-sm">
                          {report.parentFirstName} {report.parentLastName}
                        </p>
                        <p className="text-sm mt-2">{report.parentPhone}</p>
                        <p className="text-sm mt-2">{report.parentEmail}</p>
                      </div>
                      <div>
                        <h2 className="text-base font-medium text-neutral-700">
                          Billed from
                        </h2>
                        <p className="mt-4 text-sm">
                          {report.organization.name}
                        </p>
                        <p className="text-sm mt-2">
                          {report.organization.phone}
                        </p>
                        <p className="text-sm mt-2">
                          {report.organization.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="whitespace-nowrap overflow-auto shrink-0 mt-10">
                    <table className="w-full text-left">
                      <thead className="bg-neutral-100 border-y">
                        <tr>
                          <th className="font-medium px-5 py-4 text-sm first:pl-10">
                            S.no
                          </th>
                          <th className="font-medium px-5 py-4 text-sm">
                            Item
                          </th>
                          <th className="font-medium px-5 py-4 text-sm">Qty</th>
                          <th className="font-medium px-5 py-4 text-sm">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {report.tests.map((test, index) => (
                          <tr key={index}>
                            <td className="font-normal px-5 py-3 text-sm first:pl-10">
                              1
                            </td>
                            <td className="font-normal px-5 py-3 text-sm">
                              {test.name}
                            </td>
                            <td className="font-normal px-5 py-3 text-sm">1</td>
                            <td className="font-normal px-5 py-3 text-sm">
                              {getCurrencySymbol(report.payment.currency)}{" "}
                              {test.cost}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="border-t mt-5 pt-5 flex items-center justify-between pl-10 pr-24">
                    <span className="text-lg font-semibold">Subtotal</span>
                    <span className="text-lg">
                      {getCurrencySymbol(report.payment.currency)}{" "}
                      {report.payment.subtotal}
                    </span>
                  </div>

                  <div className="mt-10 flex items-center flex-wrap gap-7">
                    <div className="text-neutral-600 text-sm flex w-fit">
                      <span className="font-medium text-neutral-700">
                        Payment mode:
                      </span>
                      <span className="ml-2">
                        {capitalizeFirstLetter(report.payment.paymentMode)}
                      </span>
                    </div>
                    <div className="text-neutral-600 text-sm flex">
                      <span className="font-medium text-neutral-700">
                        Payment status:
                      </span>
                      <span className="ml-2">
                        {capitalizeFirstLetter(report.payment.paymentStatus)}
                      </span>
                    </div>
                    {report.payment.paymentStatus === "pending" && (
                      <div className="text-neutral-600 text-sm flex">
                        <span className="font-medium text-neutral-700">
                          Paid amount:
                        </span>
                        <span className="ml-2">
                          {getCurrencySymbol(report.payment.currency)}{" "}
                          {report.payment.paidAmount}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-16">
                    <h1 className="text-lg">Thank You</h1>
                    <p className="text-sm text-neutral-600 mt-2">
                      We are commited to care
                    </p>
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
                  <span>Invoice</span>
                  <span>{report.reportno}</span>
                </div>
                <div className="mt-10 px-5">
                  <div className="grid grid-cols-1 gap-8">
                    <div>
                      <h2 className="text-sm font-medium text-neutral-700">
                        Billed to
                      </h2>
                      <p className="mt-4 text-xs">
                        {report.parentFirstName} {report.parentLastName}
                      </p>
                      <p className="text-xs mt-2">{report.parentPhone}</p>
                      <p className="text-xs mt-2">{report.parentEmail}</p>
                    </div>
                    <div>
                      <h2 className="text-sm font-medium text-neutral-700">
                        Billed from
                      </h2>
                      <p className="mt-4 text-xs">{report.organization.name}</p>
                      <p className="text-xs mt-2">
                        {report.organization.phone}
                      </p>
                      <p className="text-xs mt-2">
                        {report.organization.email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="whitespace-nowrap overflow-auto shrink-0 mt-10">
                  <table className="w-full text-left">
                    <thead className="border-y">
                      <tr>
                        <th className="font-medium px-5 py-4 text-sm">S.no</th>
                        <th className="font-medium px-5 py-4 text-sm">Item</th>
                        <th className="font-medium px-5 py-4 text-sm">Qty</th>
                        <th className="font-medium px-5 py-4 text-sm">Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {report.tests.map((test, index) => (
                        <tr key={index}>
                          <td className="font-normal px-5 py-3 text-sm">1</td>
                          <td className="font-normal px-5 py-3 text-xs">
                            {test.name.substring(0, 15) + "..."}
                          </td>
                          <td className="font-normal px-5 py-3 text-sm">1</td>
                          <td className="font-normal px-5 py-3 text-sm">
                            {getCurrencySymbol(report.payment.currency)}{" "}
                            {test.cost}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 flex items-center px-5">
                  <span className="text-base font-semibold">Subtotal:</span>
                  <span className="text-base ml-1">
                    {getCurrencySymbol(report.payment.currency)}{" "}
                    {report.payment.subtotal}
                  </span>
                </div>

                <div className="mt-10 flex items-center flex-wrap gap-7 px-5">
                  <div className="text-neutral-600 text-sm flex w-fit">
                    <span className="font-medium text-neutral-700">Mode:</span>
                    <span className="ml-2">
                      {capitalizeFirstLetter(report.payment.paymentMode)}
                    </span>
                  </div>
                  <div className="text-neutral-600 text-sm flex">
                    <span className="font-medium text-neutral-700">
                      Status:
                    </span>
                    <span className="ml-2">
                      {capitalizeFirstLetter(report.payment.paymentStatus)}
                    </span>
                  </div>
                  {report.payment.paymentStatus === "pending" && (
                    <div className="text-neutral-600 text-sm flex">
                      <span className="font-medium text-neutral-700">
                        Paid amount:
                      </span>
                      <span className="ml-2">
                        {getCurrencySymbol(report.payment.currency)}{" "}
                        {report.payment.paidAmount}
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-10 px-5">
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
                    <span>Print invoice</span>
                  </Button>
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

export default Invoice;
