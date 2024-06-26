"use client";
import React from "react";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import { useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";
import { deleteFacility } from "@/prisma/facility";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function FCard({ facility, deleteCallback }) {
  const session = useSession();
  const router = useRouter();
  return (
    <li className="bg-neutral-100 p-4">
      <h2 className="text-lg font-semibold">{facility.name}</h2>
      <div className="mt-3 flex items-center">
        <span className="text-sm text-neutral-700">
          {getCurrencySymbol(session.data.user.currency)}&nbsp;
          {facility.cost}
        </span>
        <span className="text-sm text-neutral-600 ml-auto">
          {capitalizeFirstLetter(facility.availability)}
        </span>
      </div>

      <p className="text-sm text-neutral-700 mt-3">
        Created on:&nbsp;
        {new Date(facility.createdAt).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>

      <p className="text-sm text-neutral-700 mt-2">
        Average time:&nbsp;
        {facility.duration} hrs
      </p>

      <div className="font-normal mt-3 text-sm items-center flex">
        <button
          onClick={() =>
            router.push(`/dashboard/facilities/${facility.id}/edit`)
          }
          className="ml-auto hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center"
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
                case "issue":
                  console.log("Create new issue");
                  break;
                case "delete":
                  if (
                    confirm("Are you sure you want to delete this facility?")
                  ) {
                    toast.loading("Deleting facility...");
                    let { success, message } = await deleteFacility(
                      facility.id
                    );
                    toast.dismiss();
                    if (success) {
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
            <DropdownItem key="issue">Create new issue</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              Delete facility
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </li>
  );
}

export default FCard;
