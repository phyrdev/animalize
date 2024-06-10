import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { flagReport, unflagReport } from "@/prisma/report";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Invoice from "../../reports/components/Invoice";

function PRow({ payment, index, flagCallback = () => {} }) {
  const router = useRouter();
  const [showInvoice, setShowInvoice] = useState(false);
  return (
    <>
      <tr key={index} className="border-b hover:bg-neutral-50">
        <td className="font-normal px-5 py-4 text-sm first:pl-10 relative">
          {payment.flagged && (
            <div className="w-1 bg-red-400 h-full absolute left-0 top-0"></div>
          )}
          {index + 1}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {payment.report.reportno}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {new Date(payment.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {capitalizeFirstLetter(payment.paymentMode)}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {capitalizeFirstLetter(payment.paymentStatus)}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {getCurrencySymbol(payment.currency)}&nbsp;
          {payment.subtotal}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {getCurrencySymbol(payment.currency)}&nbsp;
          {payment.paidAmount}
        </td>
        <td className="font-normal py-4 text-sm inline-flex items-center gap-2">
          <button
            onClick={() =>
              router.push(
                `/dashboard/reports/${payment.report.id}/edit?redirect=payments`
              )
            }
            className="bg-neutral-100 hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M21.455 5.416a.75.75 0 0 1-.096.943l-9.193 9.192a.75.75 0 0 1-.34.195l-3.829 1a.75.75 0 0 1-.915-.915l1-3.828a.778.778 0 0 1 .161-.312L17.47 2.47a.75.75 0 0 1 1.06 0l2.829 2.828a.756.756 0 0 1 .096.118m-1.687.412L18 4.061l-8.518 8.518l-.625 2.393l2.393-.625z"
                clipRule="evenodd"
              ></path>
              <path
                fill="currentColor"
                d="M19.641 17.16a44.4 44.4 0 0 0 .261-7.04a.403.403 0 0 1 .117-.3l.984-.984a.198.198 0 0 1 .338.127a45.91 45.91 0 0 1-.21 8.372c-.236 2.022-1.86 3.607-3.873 3.832a47.77 47.77 0 0 1-10.516 0c-2.012-.225-3.637-1.81-3.873-3.832a45.922 45.922 0 0 1 0-10.67c.236-2.022 1.86-3.607 3.873-3.832a47.75 47.75 0 0 1 7.989-.213a.2.2 0 0 1 .128.34l-.993.992a.402.402 0 0 1-.297.117a46.164 46.164 0 0 0-6.66.255a2.89 2.89 0 0 0-2.55 2.516a44.421 44.421 0 0 0 0 10.32a2.89 2.89 0 0 0 2.55 2.516c3.355.375 6.827.375 10.183 0a2.89 2.89 0 0 0 2.55-2.516"
              ></path>
            </svg>
          </button>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly className="bg-transparent rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M5 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m14 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2m-7 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2"
                  ></path>
                </svg>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              onAction={async (key) => {
                switch (key) {
                  case "flag-payment":
                    toast.loading(
                      payment.flagged
                        ? "Unflagging payment..."
                        : "Flagging payment..."
                    );
                    let { success, message } = payment.flagged
                      ? await unflagReport(payment.report.id)
                      : await flagReport(payment.report.id);
                    toast.dismiss();
                    if (success) {
                      toast.success("Report flagged successfully");
                      flagCallback();
                    } else {
                      toast.error(message);
                    }
                    break;
                  case "view-invoice":
                    setShowInvoice(true);
                    break;
                  default:
                    break;
                }
              }}
              aria-label="Static Actions"
            >
              <DropdownItem key="view-invoice">View invoice</DropdownItem>
              <DropdownItem key="mark-open">Create an issue</DropdownItem>
              <DropdownItem
                key="flag-payment"
                className="text-danger"
                color="danger"
              >
                {payment.flagged ? "Unflag payment" : "Flag payment"}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </td>
      </tr>

      {showInvoice && (
        <Invoice
          report={payment.report}
          closeCallback={() => setShowInvoice(false)}
          minimized={true}
        />
      )}
    </>
  );
}

export default PRow;
