"use client";
import CustomInput from "@/app/dashboard/components/CustomInput";
import CustomSelect from "@/app/dashboard/components/CustomSelect";
import { getCurrencySymbol } from "@/helper/refactor";
import { updateReport } from "@/prisma/report";
import { paymentmodes, paymentstatus } from "@/static/lists";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

function EditReportContainer({ report }) {
  const [pFile, setPFile] = useState(report);
  const [loading, setLoading] = useState(false);
  const session = useSession();
  const router = useRouter();
  const params = useSearchParams();

  const closeAllDetails = () => {
    document.getElementById("parent-details-dd").open = false;
    document.getElementById("billing-details-dd").open = false;
  };

  const handleSave = async () => {
    if (performChecks()) {
      toast.loading("Updating report...");
      setLoading(true);
      let reportSpecifics = {
        accPin: pFile.accPin,
        additionalNotes: pFile.additionalNotes,
        contentDeclaration: pFile.contentDeclaration,
        createDoctordoggyAccount: pFile.createDoctordoggyAccount,
        parentAddress: pFile.parentAddress,
        parentEmail: pFile.parentEmail,
        parentFirstName: pFile.parentFirstName,
        parentLastName: pFile.parentLastName,
        parentPhone: pFile.parentPhone,
        parentZipcode: pFile.parentZipcode,
        petBreed: pFile.petBreed,
        petDob: new Date(pFile.petDob).toISOString(),
        petId: pFile.petId,
        petName: pFile.petName,
        petSex: pFile.petSex,
        petSpecies: pFile.petSpecies,
        petWeight: pFile.petWeight,
        tests: pFile.tests,
        empno: pFile.empno,
        orgno: pFile.orgno,
      };

      let billingSpecifics = {
        paidAmount: pFile.payment.paidAmount,
        paymentMode: pFile.payment.paymentMode,
        paymentStatus: pFile.payment.paymentStatus,
        subtotal: pFile.payment.subtotal,
        empno: pFile.empno,
        orgno: pFile.orgno,
        currency: pFile.payment.currency,
      };

      let createReportReq = await updateReport(
        report.id,
        reportSpecifics,
        billingSpecifics
      );

      toast.remove();

      if (createReportReq.success) {
        toast.success(createReportReq.message);

        if (params.get("redirect")) {
          switch (params.get("redirect")) {
            case "payments":
              router.push(`/dashboard/payments/`);
              break;
            default:
              router.push(`/dashboard/reports/`);
              break;
          }
        } else {
          router.push(`/dashboard/reports/`);
        }
        router.refresh();
      } else {
        toast.error(createReportReq.message);
      }
      setLoading(false);
    }
  };

  const performChecks = () => {
    if (pFile.parentFirstName == "") {
      toast.error("Please enter parent's first name");
      return false;
    }
    if (pFile.parentEmail == "") {
      toast.error("Please enter parent's email");
      return false;
    }
    if (pFile.parentPhone == "") {
      toast.error("Please enter parent's phone number");
      return false;
    }
    if (pFile.parentZipcode == "") {
      toast.error("Please enter parent's zipcode");
      return false;
    }
    if (pFile.payment.paidAmount == "") {
      toast.error("Please enter paid amount");
      return false;
    }
    if (isNaN(pFile.payment.paidAmount)) {
      closeAllDetails();
      document.getElementById("billing-details-dd").open = true;
      toast.error("Please enter a valid paid amount");
      return false;
    }
    return true;
  };

  if (session.status == "authenticated") {
    return (
      <div>
        <div className="px-5 md:px-10 py-5 flex items-center">
          <Breadcrumbs className="hidden md:block">
            <BreadcrumbItem>Dashboard</BreadcrumbItem>
            <BreadcrumbItem>Report</BreadcrumbItem>
            <BreadcrumbItem>Edit</BreadcrumbItem>
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

          <Button
            onClick={() => handleSave()}
            isDisabled={loading}
            className="ml-3 w-fit md:px-6 md:ml-5 h-10 rounded-md bg-neutral-800 text-white"
          >
            Save changes
          </Button>
        </div>

        <div className="md:px-10 px-5 mt-5 max-w-4xl">
          <details id="parent-details-dd" className="mt-8" open>
            <summary>
              <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                Parent details
              </div>
            </summary>
            <div className="pt-5 md:pl-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
                <CustomInput
                  value={pFile.parentFirstName}
                  onChange={(e) =>
                    setPFile({ ...pFile, parentFirstName: e.target.value })
                  }
                  label="First name"
                  placeholder="John"
                />
                <CustomInput
                  value={pFile.parentLastName}
                  onChange={(e) =>
                    setPFile({ ...pFile, parentLastName: e.target.value })
                  }
                  label="Last name"
                  placeholder="Doe"
                />
                <CustomInput
                  value={pFile.parentEmail}
                  onChange={(e) =>
                    setPFile({ ...pFile, parentEmail: e.target.value })
                  }
                  label="Email"
                  placeholder="abc@gmai.com"
                />
                <CustomInput
                  value={pFile.parentPhone}
                  onChange={(e) =>
                    setPFile({ ...pFile, parentPhone: e.target.value })
                  }
                  label="Phone no."
                  placeholder="1234567890"
                />
                <CustomInput
                  value={pFile.parentZipcode}
                  onChange={(e) =>
                    setPFile({ ...pFile, parentZipcode: e.target.value })
                  }
                  label="Zipcode"
                  placeholder="713216"
                />
                <div className="md:col-span-2 md:border w-full md:rounded flex h-20 overflow-hidden">
                  <span className="h-full w-24 px-3 border-r bg-neutral-50 flex py-3 text-sm text-neutral-500 shrink-0">
                    Address
                  </span>
                  <textarea
                    className="w-full h-full resize-none p-3 outline-none"
                    placeholder="Residential address"
                    value={pFile.parentAddress}
                    onChange={(e) =>
                      setPFile({ ...pFile, parentAddress: e.target.value })
                    }
                    name=""
                    id=""
                  ></textarea>
                </div>
                <p className="text-sm mt-4 text-neutral-600">
                  Collect the residential address in case of door step service.
                </p>
              </div>
              <div className="pb-6 flex items-center justify-end gap-2 mt-6">
                <Button
                  onClick={() => {
                    closeAllDetails();
                    document.getElementById("pet-details-dd").open = true;
                  }}
                  className="rounded bg-transparent"
                >
                  Back
                </Button>
                <Button
                  onClick={() => {
                    closeAllDetails();
                    document.getElementById("billing-details-dd").open = true;
                  }}
                  className="rounded"
                >
                  Proceed
                </Button>
              </div>
            </div>
          </details>
          <details id="billing-details-dd" className="mt-8" open>
            <summary>
              <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                Billing details
              </div>
            </summary>
            <div className="pt-5 md:pl-5">
              <div className="w-full flex flex-wrap gap-3 md:gap-6">
                <div className="text-sm">
                  <span className="text-neutral-500">Patient name:</span>{" "}
                  <span>{pFile.petName}</span>
                </div>
                <div className="text-sm">
                  <span className="text-neutral-500">Parent name:</span>{" "}
                  <span>{pFile.parentFirstName}</span>
                </div>
                <div className="text-sm">
                  <span className="text-neutral-500">Tests to be done:</span>{" "}
                  {pFile.tests.map((test, index) => {
                    return (
                      <span key={index}>
                        {test.name}
                        {index + 1 != pFile.tests.length && ", "}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center bg-neutral-50 border-y px-5 py-2 text-sm font-medium text-neutral-500">
                  <span className="w-16">S.no</span>
                  <span className="ml-3">Test name</span>
                  <span className="ml-auto">Price</span>
                </div>
                <div className="space-y-3 mt-4">
                  {pFile.tests.length == 0 && (
                    <p className="text-sm text-neutral-600 px-5 py-3">
                      No tests selected
                    </p>
                  )}
                  {pFile.tests.map((test, index) => {
                    return (
                      <div key={index} className="flex items-center px-5">
                        <span className="w-16">{index + 1}</span>
                        <span className="ml-3 text-sm">{test.name}</span>
                        <span className="ml-auto">
                          {getCurrencySymbol(session.data.user.currency)}
                          {test.cost}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center border-t px-5 py-2 font-medium mt-4">
                  <span className="text-base text-black">Subtotal</span>
                  <span className="ml-auto">₹{pFile.payment.subtotal}</span>
                </div>
              </div>

              <p className="mt-12 text-base font-medium">Record payment</p>

              <div className="mt-3 grid grid-cols-1 md:grid-cols-2 md:gap-2 border-t md:border-none">
                <CustomSelect
                  label="Mode"
                  placeholder="Cash"
                  value={pFile.payment.paymentMode}
                  onChange={(e) =>
                    setPFile({
                      ...pFile,
                      payment: {
                        ...pFile.payment,
                        paymentMode: e.target.value,
                      },
                    })
                  }
                  options={paymentmodes}
                />
                <CustomSelect
                  label="Status"
                  placeholder="Canine"
                  value={pFile.payment.paymentStatus}
                  onChange={(e) =>
                    setPFile({
                      ...pFile,
                      payment: {
                        ...pFile.payment,
                        paymentStatus: e.target.value,
                      },
                    })
                  }
                  options={paymentstatus}
                />
                <CustomInput
                  label="Paid amt."
                  placeholder="0"
                  endContent={
                    <span className="text-neutral-500 text-sm">₹</span>
                  }
                  value={parseFloat(pFile.payment.paidAmount)}
                  type="number"
                  onChange={(e) =>
                    setPFile({
                      ...pFile,
                      payment: {
                        ...pFile.payment,
                        paidAmount: parseFloat(e.target.value),
                      },
                    })
                  }
                />
              </div>

              {/* {pFile.paymentStatus == "pending" && (
                <span className="text-sm mt-6 inline-block">
                  Due amount : {getCurrencySymbol(session.data.user.currency)}
                  {parseFloat(pFile.subtotal) - parseFloat(pFile.paidAmount)}
                </span>
              )} */}
            </div>
          </details>
        </div>
      </div>
    );
  }
}

export default EditReportContainer;
