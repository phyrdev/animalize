import { capitalizeFirstLetter } from "@/helper/refactor";
import { Button } from "@nextui-org/react";
import React from "react";

function RRow({ report, index }) {
  console.log(report);
  return (
    <tr className="border-b hover:bg-neutral-50">
      <td className="font-normal px-5 py-4 text-sm first:pl-10">{index + 1}</td>
      <td className="font-normal px-5 py-4 text-sm">{report.reportno}</td>
      <td className="font-normal px-5 py-4 text-sm">
        {new Date(report.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </td>
      <td className="font-normal px-5 py-4 text-sm">{report.petName}</td>
      <td className="font-normal px-5 py-4 text-sm">{report.status}</td>
      <td className="font-normal px-5 py-4 text-sm">
        {capitalizeFirstLetter(report.payment.paymentStatus)}
      </td>
      <td className="font-normal px-5 py-4 text-sm">
        <Button className="rounded-md bg-transparent border border-neutral-400">
          Collect sample
        </Button>
      </td>
      <td className="font-normal py-4 text-sm inline-flex items-center gap-2">
        <button className="bg-sky-100 hover:bg-sky-200 h-10 w-10 rounded transition-all flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
              <path d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path>
              <path d="M12 3c5.592 0 10.29 3.824 11.622 9c-1.332 5.176-6.03 9-11.622 9S1.71 17.176.378 12C1.71 6.824 6.408 3 12 3m0 16c-4.476 0-8.269-2.942-9.543-7C3.731 7.942 7.524 5 12 5c4.476 0 8.269 2.942 9.543 7c-1.274 4.058-5.067 7-9.543 7"></path>
            </g>
          </svg>
        </button>
        <button className="bg-neutral-100 hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center">
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
        <button className="h-10 w-10 rounded transition-all flex items-center justify-center">
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
        </button>
      </td>
    </tr>
  );
}

export default RRow;
