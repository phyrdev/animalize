/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef } from "react";
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

function Settings() {
  const router = useRouter();
  const signref = useRef();
  const session = useSession();

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
          <details id="patient-details" open>
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
          <details id="security-details" className="mt-10">
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
                  <div className="border w-fit h-fit mt-2">
                    <ReactSignatureCanvas
                      ref={signref}
                      penColor="black"
                      backgroundColor="white"
                      canvasProps={{
                        width: "400px",
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
        </div>
      </div>
    );
  }
}

export default Settings;
