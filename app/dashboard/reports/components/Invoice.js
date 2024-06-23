/* eslint-disable @next/next/no-img-element */
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { sendInitialInvoice, sendInvoice } from "@/prisma/report";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import toast from "react-hot-toast";
import QRCode from "react-qr-code";
import { useReactToPrint } from "react-to-print";

export const maxDuration = 30; // Applies to the actions

function Invoice({
  report,
  closeCallback = () => {},
  minimized = false,
  firstInvoice = false,
}) {
  const router = useRouter();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Invoice-${report.reportno}`,
  });
  return (
    <div className="fixed inset-0 h-full w-full bg-black/50 flex items-end md:items-center justify-center z-20 md:py-20">
      <div className="max-w-4xl bg-white h-[600px] overflow-y-auto md:rounded">
        <div>
          <div className="px-5 md:px-10 mt-5 md:mt-10">
            <div className="flex items-center flex-wrap gap-3">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 48 48"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth={4}
                  >
                    <path d="M41 14L24 4L7 14v20l17 10l17-10z"></path>
                    <path
                      strokeLinecap="round"
                      d="M24 22v8m8-12v12m-16-4v4"
                    ></path>
                  </g>
                </svg>
                <span className="text-lg font-medium ml-3">Report created</span>
              </div>
              <Button
                onClick={() => {
                  if (minimized) {
                    closeCallback();
                  } else {
                    router.push("/dashboard/reports");
                  }
                }}
                className="rounded ml-auto bg-neutral-100"
              >
                <span>Close </span>
              </Button>
              {minimized == false && (
                <Button
                  onClick={() => {
                    location.reload();
                  }}
                  className="rounded bg-neutral-200"
                >
                  Create another report
                </Button>
              )}
            </div>
            <div className="inline-flex items-start gap-2 mt-5 md:mt-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="shrink-0 hidden md:block"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M4 18.646V8.054c0-2.854 0-4.28.879-5.167C5.757 2 7.172 2 10 2h4c2.828 0 4.243 0 5.121.887C20 3.773 20 5.2 20 8.054v10.592c0 1.511 0 2.267-.462 2.565c-.755.486-1.922-.534-2.509-.904c-.485-.306-.727-.458-.997-.467c-.29-.01-.537.137-1.061.467l-1.911 1.205c-.516.325-.773.488-1.06.488s-.544-.163-1.06-.488l-1.91-1.205c-.486-.306-.728-.458-.997-.467c-.291-.01-.538.137-1.062.467c-.587.37-1.754 1.39-2.51.904C4 20.913 4 20.158 4 18.646M11 11H8m6-4H8"
                  color="currentColor"
                />
              </svg>
              <p className="text-sm text-neutral-600 leading-7">
                A copy of the invoice has been sent to the pet parent&apos;s
                email address.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 items-center justify-start mt-7 px-5 md:px-10">
            <Button
              onClick={() => {
                let message = `Report no: ${report.reportno} has been created successfully. You can view the invoice at https://animalize.io/invoice/${report.reportno} . You can track the realtime status of the report at https://animalize.io/status/${report.reportno}`;
                try {
                  navigator.clipboard.writeText(message);
                  toast.success("Copied to clipboard");
                } catch (error) {
                  toast.error("Failed to copy to clipboard");
                }
              }}
              isIconOnly
              className="rounded bg-neutral-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 512 512"
              >
                <rect
                  width={336}
                  height={336}
                  x={128}
                  y={128}
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth={32}
                  rx={57}
                  ry={57}
                ></rect>
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={32}
                  d="m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24"
                ></path>
              </svg>
            </Button>
            <Button onClick={handlePrint} className="rounded bg-neutral-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                >
                  <path d="M8 18H6a2 2 0 0 1-2-2V7h16v9a2 2 0 0 1-2 2h-2M8 3h8v4H8z"></path>
                  <path strokeLinecap="round" d="M12 11H8"></path>
                  <path d="M8 15h8v6H8z"></path>
                </g>
              </svg>
              <span>Print receipt</span>
            </Button>
            <Button
              isDisabled={
                report.parentEmail == null ||
                report.parentEmail.trim().length == 0
              }
              onClick={async () => {
                toast.loading("Sending email");
                await sendInvoice(report.reportno);
                toast.dismiss();
                toast.success("Email sent successfully");
              }}
              className="rounded bg-neutral-800 text-white"
            >
              {firstInvoice ? "Send invoice email" : "Resend invoice email"}
            </Button>
          </div>
          <div className="w-full h-[1px] bg-neutral-200 mt-16"></div>
          <div className="w-full overflow-x-auto">
            <div
              ref={componentRef}
              className="p-10 leading-8 relative w-[896px]"
            >
              <h1 className="text-3xl">{report.organization.name}</h1>
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
                          {index + 1}
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

              <div className="mt-16 flex items-end justify-between">
                <div>
                  <h1 className="text-lg">Thank You</h1>
                  <p className="text-sm text-neutral-600 mt-2">
                    We are commited to care
                  </p>
                </div>
                <p className="text-xs text-neutral-600">
                  Powered by animalize.io
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invoice;
