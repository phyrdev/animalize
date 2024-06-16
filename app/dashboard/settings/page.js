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
                <p className="text-sm font-medium mt-8">
                  Please use a stylus or your finger / mouse to sign in the box
                  below.
                </p>

                <div className="border w-fit h-fit mt-2">
                  <ReactSignatureCanvas
                    ref={signref}
                    penColor="black"
                    backgroundColor="white"
                    canvasProps={{
                      width: "500px",
                      height: 200,
                      className: "sigCanvas",
                    }}
                  />
                </div>
                <div className="flex justify-between items-center max-w-[500px] mt-4">
                  <Button
                    onClick={() => signref.current.clear()}
                    className="rounded-md"
                  >
                    Clear
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
          </details>
        </div>
      </div>
    );
  }
}

export default Settings;
