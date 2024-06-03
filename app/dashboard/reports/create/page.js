"use client";
import { BreadcrumbItem, Breadcrumbs, Button, Input } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { RadioGroup, Radio } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function CreateReport() {
  return (
    <div>
      <div className="px-5 md:px-10 py-5 flex items-center">
        <Breadcrumbs className="hidden md:block">
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Reports</BreadcrumbItem>
          <BreadcrumbItem>Create</BreadcrumbItem>
        </Breadcrumbs>
        <span className="text-xl font-semibold md:hidden">Create report</span>
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
            Save report
          </Button>
        </Link>
      </div>

      <div className="md:px-10 px-5 mt-5 max-w-4xl">
        <details id="auto-fill-dd" open>
          <summary>
            <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
              Is the pet registered in doctordoggy ?
            </div>
          </summary>
          <div className="pt-5 md:pl-5">
            <RadioGroup
              label="Select an appropriate option"
              orientation="horizontal"
              classNames={{
                wrapper: "flex flex-wrap gap-6",
                label: "pb-2 text-sm",
              }}
            >
              <Radio value="buenos-aires">Yes</Radio>
              <Radio value="sydney">No</Radio>
            </RadioGroup>
            <div className="border-b pb-6 h-14 flex items-center justify-end">
              <Button
                onClick={() => {
                  document.getElementById("auto-fill-dd").open = false;
                }}
                className="rounded"
              >
                Proceed
              </Button>
            </div>
          </div>
        </details>
        <details id="pet-details-dd" className="mt-8">
          <summary>
            <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
              Pet details
            </div>
          </summary>
          <div className="pt-5 md:pl-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-3">
              <Input label="Pet name" radius="none" />
              <Select
                label="Select pet species"
                radius="none"
                classNames={{
                  mainWrapper: "rounded-none",
                }}
              >
                <SelectItem key={"canine"}>Canine</SelectItem>
                <SelectItem key={"feline"}>Feline</SelectItem>
              </Select>
              <Select
                label="Select pet breed"
                radius="none"
                classNames={{
                  mainWrapper: "rounded-none",
                }}
              >
                <SelectItem key={"canaine"}>Canine</SelectItem>
                <SelectItem key={"feline"}>Feline</SelectItem>
              </Select>
              <Select
                label="Select pet sex"
                radius="none"
                classNames={{
                  mainWrapper: "rounded-none",
                }}
              >
                <SelectItem key={"canaine"}>Male intact</SelectItem>
                <SelectItem key={"canaine"}>Male neutered</SelectItem>
                <SelectItem key={"feline"}>Feline</SelectItem>
              </Select>
              <Input label="Body weight (Kg)" radius="none" type="number" />
              <DateInput label={"Pet date of birth"} radius="none" />
            </div>
            <div className="border-b pb-6 flex items-center justify-end gap-2 mt-6">
              <Button
                onClick={() => {
                  document.getElementById("auto-fill-dd").open = false;
                }}
                className="rounded bg-transparent"
              >
                Back
              </Button>
              <Button
                onClick={() => {
                  document.getElementById("auto-fill-dd").open = false;
                }}
                className="rounded"
              >
                Proceed
              </Button>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}

export default CreateReport;
