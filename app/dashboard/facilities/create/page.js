"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import { facilityavailability } from "@/static/lists";
import { permissions } from "@/static/permissions";

function CreateFacility() {
  const session = useSession();

  if (session.status == "authenticated") {
    if (
      permissions.manageFacilities.includes(session.data.user.role) == false
    ) {
    } else {
      return (
        <div>
          <div className="px-5 md:px-10 py-5 flex items-center">
            <Breadcrumbs className="hidden md:block">
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
              <BreadcrumbItem>Facilities</BreadcrumbItem>
              <BreadcrumbItem>Create</BreadcrumbItem>
            </Breadcrumbs>
            <span className="text-xl font-semibold md:hidden">
              Add facility
            </span>
            <Button isIconOnly className="ml-auto rounded-md bg-neutral-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M17 9a8 8 0 1 0-6.278 7.814a6 6 0 0 1-.388-.94a7 7 0 1 1 5.64-7.474l.032.03q.3.313.597.537q.197.149.394.263Q17 9.115 17 9M9.049 5a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5M9 7.5a.5.5 0 0 1 .492.41L9.5 8v4.502a.5.5 0 0 1-.992.09l-.008-.09V8a.5.5 0 0 1 .5-.5m8 2.847a4.6 4.6 0 0 1-1-.583a6 6 0 0 1-.716-.642a.39.39 0 0 0-.566 0c-.995 1.036-2.095 1.545-3.318 1.545c-.22 0-.4.186-.4.416v2.501l.004.266q.04 1.196.44 2.15A4.8 4.8 0 0 0 13 18q.787.6 1.874.979a.4.4 0 0 0 .254 0c2.56-.89 3.873-2.713 3.873-5.395v-2.5l-.008-.085a.405.405 0 0 0-.392-.332q-.304 0-.6-.043a4 4 0 0 1-1-.277"
                />
              </svg>
            </Button>

            <Link href="/dashboard/reports/create">
              <Button className="ml-3 w-fit md:px-6 md:ml-5 h-10 rounded-md bg-neutral-800 text-white">
                Save facility
              </Button>
            </Link>
          </div>
          <div className="md:px-10 px-5 mt-5 max-w-4xl">
            <details id="details-fill-dd">
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Facility details
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <div className="grid grid-cols-2 gap-2">
                  <CustomInput label="Name" placeholder={"Liver func. test"} />
                  <CustomInput
                    label="Cost"
                    type="number"
                    endContent={<span className="text-neutral-600">₹</span>}
                    placeholder={"1000"}
                  />
                  <CustomInput
                    label="Duration"
                    endContent={
                      <span className="text-neutral-500 text-sm">hours</span>
                    }
                    placeholder={"24"}
                  />
                  <CustomSelect
                    label="Avail. stat."
                    options={facilityavailability}
                  />
                </div>

                <p className="mt-5 text-sm leading-6 text-neutral-500">
                  <span className="text-neutral-900">Duration</span> refers to
                  the total time taken to generate report for this particular
                  facility.
                </p>
              </div>
            </details>
            <details id="parameter-fill-dd" className="mt-16">
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Parameters
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <div className="grid grid-cols-5 gap-2 bg-neutral-100 border-y px-3 text-sm py-2 font-medium text-neutral-600">
                  <span>Name</span>
                  <span>Descripion</span>
                  <span>Unit</span>
                  <span>Normal range</span>
                  <span></span>
                </div>
                <div className="grid grid-cols-5 gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="border py-2 px-3 rounded"
                    name=""
                    id=""
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="border py-2 px-3 rounded"
                    name=""
                    id=""
                  />
                  <input
                    type="text"
                    placeholder="Unit"
                    className="border py-2 px-3 rounded"
                    name=""
                    id=""
                  />
                  <div className="grid grid-cols-2 gap-1">
                    <input
                      type="text"
                      placeholder="Low"
                      className="border py-2 text-center rounded"
                      name=""
                      id=""
                    />
                    <input
                      type="text"
                      placeholder="High"
                      className="border py-2 text-center rounded"
                      name=""
                      id=""
                    />
                  </div>
                  <Button className="w-full rounded-md bg-neutral-800 text-white">
                    Add parameter
                  </Button>
                </div>
              </div>
            </details>
          </div>
        </div>
      );
    }
  }
}

export default CreateFacility;
