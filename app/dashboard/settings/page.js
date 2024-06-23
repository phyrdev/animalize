/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import PermissionDenied from "../components/PermissionDenied";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import CustomInput from "../components/CustomInput";
import { useSession } from "next-auth/react";
import { capitalizeFirstLetter } from "@/helper/refactor";
import ReactSignatureCanvas from "react-signature-canvas";
import toast from "react-hot-toast";
import { updateSignature } from "@/prisma/employee";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/helper/image";
import GlobalState from "@/context/GlobalState";
import { updateOrganization } from "@/prisma/organization";
import CustomSelect from "../components/CustomSelect";
import { currencies } from "@/static/lists";

function Settings() {
  const router = useRouter();
  const signref = useRef();
  const session = useSession();
  const { organization, refreshOrg } = useContext(GlobalState);
  const [tOrg, setTorg] = useState({});

  const handleUpdateOrg = async () => {
    if (performChecks()) {
      toast.loading("Updating organization settings...");
      let updateOrgRequest = await updateOrganization(tOrg.orgno, tOrg);
      toast.remove();
      if (updateOrgRequest.success) {
        toast.success("Organization settings updated successfully");
        refreshOrg();
      } else {
        toast.error("Failed to update organization settings");
      }
    }
  };

  const performChecks = () => {
    if (tOrg.name == "") {
      toast.error("Organization name is required");
      return false;
    }
    if (tOrg.email == "") {
      toast.error("Organization email is required");
      return false;
    }
    if (tOrg.phone == "") {
      toast.error("Organization phone number is required");
      return false;
    }

    return true;
  };

  useEffect(() => {
    setTorg(organization);
  }, [organization]);

  if (session.status == "authenticated") {
    return (
      <div>
        <div className="px-5 md:px-10 py-5 flex items-center">
          <Breadcrumbs className="hidden md:block">
            <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
            <BreadcrumbItem href="/dashboard/reports">Reports</BreadcrumbItem>
            <BreadcrumbItem>Settings</BreadcrumbItem>
          </Breadcrumbs>
          <span className="text-xl font-semibold md:hidden">Review</span>
        </div>
        <div className="p-5 md:px-10">
          <details id="account-details">
            <summary>
              <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                Your account
              </div>
            </summary>
            <div className="pt-5 md:pl-5">
              <div className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                  <CustomInput
                    label="Name"
                    value={session.data.user.name}
                    readOnly
                  />
                  <CustomInput
                    label="Emp no."
                    value={session.data.user.empno}
                    readOnly
                  />
                  <CustomInput
                    label="Email"
                    value={session.data.user.email}
                    readOnly
                  />
                  <CustomInput
                    label="Phone"
                    value={session.data.user.phone}
                    readOnly
                  />

                  <CustomInput
                    label="Role"
                    type="text"
                    value={capitalizeFirstLetter(session.data.user.role)}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </details>
          <details id="security-details" className="mt-10">
            <summary>
              <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                Change password
              </div>
            </summary>
            <div className="pt-5 md:pl-5">
              <div className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                  <CustomInput
                    label="Old pass"
                    type="password"
                    placeholder={"Enter old password"}
                  />
                  <CustomInput
                    label="New pass"
                    type="password"
                    placeholder={"Enter new password"}
                  />
                  <CustomInput
                    label="Confirm"
                    type="password"
                    placeholder={"Confirm new password"}
                  />
                </div>
              </div>
            </div>
          </details>
          <details id="signature-details" className="mt-10">
            <summary>
              <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                Digital signature
              </div>
            </summary>
            <div className="pt-5 md:pl-5">
              <div className="max-w-3xl">
                <p className="text-sm text-neutral-600 leading-7">
                  If you are a pathologist / lab technician, you are required to
                  save your digital signature brefore you can sign off reports.
                </p>

                {session.data.user.signature && (
                  <div>
                    <p className="text-sm font-medium mt-8">
                      Current signature:
                    </p>
                    <div className="border p-4 flex items-center justify-center max-w-[400px] w-full mt-2">
                      <img
                        src={session.data.user.signature}
                        className="max-w-[400px] w-full"
                        alt=""
                      />
                    </div>
                  </div>
                )}

                <div className="max-w-[400px] mt-8">
                  <p className="text-sm font-medium">
                    Use a stylus or your finger / mouse to sign in the box
                    below.
                  </p>
                  <div className="border w-full h-fit mt-2">
                    <ReactSignatureCanvas
                      ref={signref}
                      penColor="black"
                      backgroundColor="white"
                      canvasProps={{
                        width: "full",
                        height: 200,
                        className: "sigCanvas",
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Button
                      onClick={() => signref.current.clear()}
                      className="rounded-md bg-transparent px-0 w-fit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fill-rule="evenodd"
                          d="M10.31 2.25h3.38c.217 0 .406 0 .584.028a2.25 2.25 0 0 1 1.64 1.183c.084.16.143.339.212.544l.111.335a1.25 1.25 0 0 0 1.263.91h3a.75.75 0 0 1 0 1.5h-17a.75.75 0 0 1 0-1.5h3.09a1.25 1.25 0 0 0 1.173-.91l.112-.335c.068-.205.127-.384.21-.544a2.25 2.25 0 0 1 1.641-1.183c.178-.028.367-.028.583-.028m-1.302 3a2.757 2.757 0 0 0 .175-.428l.1-.3c.091-.273.112-.328.133-.368a.75.75 0 0 1 .547-.395a3.2 3.2 0 0 1 .392-.009h3.29c.288 0 .348.002.392.01a.75.75 0 0 1 .547.394c.021.04.042.095.133.369l.1.3l.039.112c.039.11.085.214.136.315z"
                          clip-rule="evenodd"
                        />
                        <path
                          fill="currentColor"
                          d="M5.915 8.45a.75.75 0 1 0-1.497.1l.464 6.952c.085 1.282.154 2.318.316 3.132c.169.845.455 1.551 1.047 2.104c.591.554 1.315.793 2.17.904c.822.108 1.86.108 3.146.108h.879c1.285 0 2.324 0 3.146-.108c.854-.111 1.578-.35 2.17-.904c.591-.553.877-1.26 1.046-2.104c.162-.813.23-1.85.316-3.132l.464-6.952a.75.75 0 0 0-1.497-.1l-.46 6.9c-.09 1.347-.154 2.285-.294 2.99c-.137.685-.327 1.047-.6 1.303c-.274.256-.648.422-1.34.512c-.713.093-1.653.095-3.004.095h-.774c-1.35 0-2.29-.002-3.004-.095c-.692-.09-1.066-.256-1.34-.512c-.273-.256-.463-.618-.6-1.302c-.14-.706-.204-1.644-.294-2.992z"
                        />
                        <path
                          fill="currentColor"
                          d="M9.425 10.254a.75.75 0 0 1 .821.671l.5 5a.75.75 0 0 1-1.492.15l-.5-5a.75.75 0 0 1 .671-.821m5.15 0a.75.75 0 0 1 .671.82l-.5 5a.75.75 0 0 1-1.492-.149l.5-5a.75.75 0 0 1 .82-.671"
                        />
                      </svg>
                      <span>Clear</span>
                    </Button>
                    <Button
                      onClick={async () => {
                        toast.loading("Saving signature...");
                        const img = signref.current
                          .getTrimmedCanvas()
                          .toDataURL("image/png");

                        const file = new File([img], "signature.png", {
                          type: "image/png",
                        });
                        const formData = new FormData();
                        formData.append("signature", file);
                        let uploadSignatureRequest = await uploadImage(file);

                        if (uploadSignatureRequest.success) {
                          let updateSignatureRequest = await updateSignature(
                            session.data.user.empno,
                            uploadSignatureRequest.url
                          );
                          toast.remove();

                          if (updateSignatureRequest.success) {
                            toast.success("Signature saved successfully");
                            location.reload();
                          } else {
                            toast.error("Failed to save signature");
                          }
                        }
                      }}
                      className="rounded-md bg-neutral-800 text-white"
                    >
                      Save signature
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </details>
          {(session.data.user.role == "super-admin" ||
            session.data.user.role == "admin") && (
            <details id="organization-details" className="mt-10" open>
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Organization settings
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <div className="max-w-3xl">
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                    <CustomInput
                      label="Name"
                      value={tOrg.name}
                      onChange={(e) => {
                        setTorg({ ...tOrg, name: e.target.value });
                      }}
                    />
                    <CustomInput
                      label="Org no."
                      value={tOrg.orgno}
                      onChange={(e) => {
                        e.preventDefault();
                      }}
                      readOnly
                    />
                    <CustomInput
                      label="Email"
                      value={tOrg.email}
                      onChange={(e) => {
                        setTorg({ ...tOrg, email: e.target.value });
                      }}
                    />
                    <CustomInput
                      label="Phone"
                      value={tOrg.phone}
                      onChange={(e) => {
                        setTorg({ ...tOrg, phone: e.target.value });
                      }}
                    />
                    <CustomSelect
                      label="Currency"
                      value={tOrg.currency}
                      onChange={(e) => {
                        setTorg({ ...tOrg, currency: e.target.value });
                      }}
                      options={currencies.map((currency) => {
                        return { label: currency.name, value: currency.abbr };
                      })}
                    />
                    <div className="md:col-span-2 md:border w-full md:rounded flex h-20 overflow-hidden">
                      <span className="h-full w-24 px-3 border-r bg-neutral-50 flex py-3 text-sm text-neutral-500 shrink-0">
                        Address
                      </span>
                      <textarea
                        className="w-full h-full resize-none p-3 outline-none"
                        placeholder="Permanent address"
                        value={tOrg.address}
                        onChange={(e) => {
                          setTorg({ ...tOrg, address: e.target.value });
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="currentColor"
                        d="M8 6.5V8H7a5 5 0 0 0-5 5v7.5A3.5 3.5 0 0 0 5.5 24H7v1.5a3.5 3.5 0 0 0 3.5 3.5h11a3.5 3.5 0 0 0 3.5-3.5V24h1.5a3.5 3.5 0 0 0 3.5-3.5V13a5 5 0 0 0-5-5h-1V6.5A3.5 3.5 0 0 0 20.5 3h-9A3.5 3.5 0 0 0 8 6.5M11.5 5h9A1.5 1.5 0 0 1 22 6.5V8H10V6.5A1.5 1.5 0 0 1 11.5 5M9 19.5a1.5 1.5 0 0 1 1.5-1.5h11a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 9 25.5z"
                      ></path>
                    </svg>
                    <span className="text-sm font-medium">Print settings</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 mt-5">
                    <CustomInput
                      label="M. Top"
                      value={tOrg.printMarginTop}
                      placeholder={"0"}
                      endContent={
                        <span className="text-neutral-500 text-sm">mm</span>
                      }
                      onChange={(e) => {
                        setTorg({ ...tOrg, printMarginTop: e.target.value });
                      }}
                    />
                    <CustomInput
                      label="M. Right"
                      placeholder={"0"}
                      endContent={
                        <span className="text-neutral-500 text-sm">mm</span>
                      }
                      value={tOrg.printMarginRight}
                      onChange={(e) => {
                        setTorg({ ...tOrg, printMarginRight: e.target.value });
                      }}
                    />
                    <CustomInput
                      label="M. Bottom"
                      placeholder={"0"}
                      endContent={
                        <span className="text-neutral-500 text-sm">mm</span>
                      }
                      value={tOrg.printMarginBottom}
                      onChange={(e) => {
                        setTorg({ ...tOrg, printMarginBottom: e.target.value });
                      }}
                    />

                    <CustomInput
                      label="M. Left"
                      placeholder={"0"}
                      endContent={
                        <span className="text-neutral-500 text-sm">mm</span>
                      }
                      value={tOrg.printMarginLeft}
                      onChange={(e) => {
                        setTorg({ ...tOrg, printMarginLeft: e.target.value });
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-end mt-7">
                    <Button
                      onClick={() => handleUpdateOrg()}
                      className=" rounded-md bg-neutral-900 text-white"
                    >
                      Save changes
                    </Button>
                  </div>
                </div>
              </div>
            </details>
          )}
        </div>
      </div>
    );
  }
}

export default Settings;
