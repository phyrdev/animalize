/* eslint-disable @next/next/no-img-element */
"use client";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { getReportByReptNo } from "@/prisma/report";
import { Spinner } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

function Invoice({ params }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

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
          <div className="flex h-fit mt-20 justify-center">
            <Spinner />
          </div>
        </>
      ) : (
        <>
          {report ? (
            <div className="p-10 leading-8 relative w-[896px] bg-white h-fit mt-10">
              <img src="/explogo.svg" className="w-32" alt="" />
              <div className="text-neutral-600 text-sm flex mt-6">
                <span className="font-medium text-neutral-700">Report no:</span>
                <span className="ml-2">{report.reportno}</span>
              </div>

              <div className="h-16 w-16 absolute top-10 right-10">
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
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
                    <p className="mt-4 text-sm">{report.organization.name}</p>
                    <p className="text-sm mt-2">{report.organization.phone}</p>
                    <p className="text-sm mt-2">{report.organization.email}</p>
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
                      <th className="font-medium px-5 py-4 text-sm">Item</th>
                      <th className="font-medium px-5 py-4 text-sm">Qty</th>
                      <th className="font-medium px-5 py-4 text-sm">Price</th>
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
          ) : (
            <>{message}</>
          )}
        </>
      )}
    </div>
  );
}

export default Invoice;
