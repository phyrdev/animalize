import { capitalizeFirstLetter } from "@/helper/refactor";
import { deleteIssue, markClosed, markOpen } from "@/prisma/issue";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

function IRow({ issue, index, deleteCallback = () => {}, showClosed }) {
  const [expanded, setExpanded] = useState(false);

  if (issue.status == "closed" && !showClosed) return null;

  return (
    <>
      <tr key={index} className="border-b hover:bg-neutral-50">
        <td className="font-normal px-5 py-4 text-sm first:pl-10">
          {index + 1}
        </td>
        <td
          onClick={() => setExpanded(true)}
          className="font-normal px-5 py-4 text-sm cursor-pointer"
        >
          {issue.title.length > 20
            ? issue.title.substring(0, 20) + "..."
            : issue.title}
        </td>
        <td
          onClick={() => setExpanded(true)}
          className="font-normal px-5 py-4 text-sm cursor-pointer"
        >
          {issue.description.length > 20
            ? issue.description.substring(0, 20) + "..."
            : issue.description}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {capitalizeFirstLetter(issue.status)}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {capitalizeFirstLetter(issue.priority)}
        </td>
        <td className="font-normal px-5 py-4 text-sm">{issue.empno}</td>
        <td className="font-normal px-5 py-4 text-sm">
          {new Date(issue.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </td>
        <td className="font-normal py-4 text-sm inline-flex items-center gap-2">
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
                  case "mark-open":
                    toast.loading("Marking issue as open...");
                    let mOpenReq = await markOpen(issue.id);
                    toast.dismiss();
                    if (mOpenReq.success) {
                      toast.success("Issue marked as open");
                      deleteCallback();
                    } else {
                      toast.error(mOpenReq.message);
                    }
                    break;
                  case "mark-closed":
                    toast.loading("Marking issue as closed...");
                    let mClosedReq = await markClosed(issue.id);
                    toast.dismiss();
                    if (mClosedReq.success) {
                      toast.success("Issue marked as closed");
                      deleteCallback();
                    } else {
                      toast.error(mClosedReq.message);
                    }
                    break;
                  case "delete":
                    if (
                      confirm("Are you sure you want to delete this issue?")
                    ) {
                      toast.loading("Deleting issue...");
                      let { success, message } = await deleteIssue(issue.id);
                      toast.dismiss();
                      if (success) {
                        toast.success("Issue deleted successfully");
                        deleteCallback();
                      } else {
                        toast.error(message);
                      }
                    }
                    break;
                  default:
                    break;
                }
              }}
              aria-label="Static Actions"
            >
              <DropdownItem key="mark-closed">Mark as closed</DropdownItem>
              <DropdownItem key="mark-open">Mark as open</DropdownItem>
              <DropdownItem key="delete" className="text-danger" color="danger">
                Delete issue
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </td>
      </tr>

      {expanded && (
        <div className="fixed inset-0 h-full w-full bg-black/50 z-20 flex items-center justify-center">
          <div className="w-[500px] h-[400px] bg-white rounded-md p-5">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M1.5 8a6.5 6.5 0 0 1 13 0A.75.75 0 0 0 16 8a8 8 0 1 0-8 8a.75.75 0 0 0 0-1.5A6.5 6.5 0 0 1 1.5 8"
                ></path>
                <path
                  fill="currentColor"
                  d="M8 9.5a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3m1.5 1.75a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75m2.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z"
                ></path>
              </svg>
              <h1 className="text-lg font-medium ml-4">Issue details</h1>
              <button onClick={() => setExpanded(false)} className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="m8 8l32 32M8 40L40 8"
                  />
                </svg>
              </button>
            </div>

            <p className="text-xs text-neutral-500 mt-6">
              Issue status & priority
            </p>
            <h1 className="mt-1">
              {capitalizeFirstLetter(issue.status)} -{" "}
              {capitalizeFirstLetter(issue.priority)}
            </h1>
            <p className="text-xs text-neutral-500 mt-4">Issue title</p>
            <h1 className="mt-1">{issue.title}</h1>
            <p className="text-xs text-neutral-500 mt-4">Issue description</p>
            <p className="mt-3 whitespace-pre-line text-sm leading-6">
              {issue.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default IRow;