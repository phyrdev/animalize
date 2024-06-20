/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { permissions } from "@/static/permissions";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import PermissionDenied from "../../components/PermissionDenied";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import { employeeroles } from "@/static/lists";
import toast from "react-hot-toast";
import { createEmployee } from "@/prisma/employee";
import { useRouter } from "next/navigation";
import GlobalState from "@/context/GlobalState";
import ReactSignatureCanvas from "react-signature-canvas";
import { uploadImage } from "@/helper/image";

function CreatePerson() {
  const signref = useRef();
  const router = useRouter();
  const session = useSession();
  const [tperson, setTPerson] = useState({
    name: "",
    email: "",
    role: "admin",
    phone: "",
    zipcode: "",
    orgno: "",
    designation: "",
  });

  const [loading, setLoading] = useState(false);
  const { refreshOrgEmployees } = useContext(GlobalState);

  const handleSave = async () => {
    if (
      tperson.name == "" ||
      tperson.email == "" ||
      tperson.phone == "" ||
      tperson.role == ""
    ) {
      toast.error("Please fill all fields.");
      return false;
    }

    if (tperson.role == "pathologist" && tperson.designation == "") {
      toast.error("Please fill qualification for pathologist.");
      return false;
    }

    setLoading(true);
    toast.loading("Creating employee...");
    const img = signref.current.getTrimmedCanvas().toDataURL("image/png");
    const file = new File([img], "signature.png", {
      type: "image/png",
    });
    let uploadSignatureRequest = await uploadImage(file);
    if (uploadSignatureRequest.success) {
      let { success, message } = await createEmployee(
        tperson,
        uploadSignatureRequest.url
      );
      toast.remove();
      if (success) {
        await refreshOrgEmployees();
        toast.success("Employee created successfully");
        router.push("/dashboard/people");
      } else {
        toast.error(message);
      }
    } else {
      toast.error("Error uploading signature.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      if (permissions.manageEmployees.includes(session.data.user.role)) {
        setTPerson({ ...tperson, orgno: session.data.user.orgno });
      }
    }
  }, [session.status]);

  if (session.status == "authenticated") {
    if (permissions.manageEmployees.includes(session.data.user.role) == false) {
      return <PermissionDenied />;
    } else {
      return (
        <div>
          <div className="px-5 md:px-10 py-5 flex items-center">
            <Breadcrumbs className="hidden md:block">
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
              <BreadcrumbItem>People</BreadcrumbItem>
              <BreadcrumbItem>Add</BreadcrumbItem>
            </Breadcrumbs>
            <span className="text-xl font-semibold md:hidden">Add person</span>
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
              isLoading={loading}
              isDisabled={loading}
              className="ml-3 w-fit md:px-6 md:ml-5 h-10 rounded-md bg-neutral-800 text-white"
            >
              Save person
            </Button>
          </div>
          <div className="md:px-10 px-5 mt-5 max-w-4xl">
            <details id="details-fill-dd" open>
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Person details
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                  <CustomInput
                    value={tperson.name}
                    onChange={(e) =>
                      setTPerson({ ...tperson, name: e.target.value })
                    }
                    label="Name"
                    placeholder={"John Doe"}
                  />
                  <CustomInput
                    label="Phone"
                    type="tel"
                    value={tperson.phone}
                    onChange={(e) =>
                      setTPerson({ ...tperson, phone: e.target.value })
                    }
                    placeholder={"01234XXXX"}
                    endContent={
                      <span className="text-neutral-500 text-sm">#</span>
                    }
                  />

                  <CustomInput
                    label="email"
                    type="email"
                    value={tperson.email}
                    onChange={(e) =>
                      setTPerson({ ...tperson, email: e.target.value })
                    }
                    endContent={
                      <span className="text-neutral-500 text-sm">@</span>
                    }
                    placeholder={"abc@gmail.com"}
                  />
                  <CustomSelect
                    label="Role"
                    value={tperson.role}
                    onChange={(e) =>
                      setTPerson({ ...tperson, role: e.target.value })
                    }
                    options={employeeroles}
                  />
                  {tperson.role == "pathologist" && (
                    <CustomInput
                      label="Qualific."
                      type="text"
                      value={tperson.designation}
                      onChange={(e) =>
                        setTPerson({ ...tperson, designation: e.target.value })
                      }
                      endContent={
                        <span className="text-neutral-500 text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={20}
                            height={20}
                            viewBox="0 0 48 48"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeLinejoin="round"
                              strokeWidth={4}
                            >
                              <path d="M2 17.4L23.022 9l21.022 8.4l-21.022 8.4z"></path>
                              <path
                                strokeLinecap="round"
                                d="M44.044 17.51v9.223m-32.488-4.908v12.442S16.366 39 23.022 39c6.657 0 11.467-4.733 11.467-4.733V21.825"
                              ></path>
                            </g>
                          </svg>
                        </span>
                      }
                      placeholder={"B.V.Sc & A.H"}
                    />
                  )}
                </div>

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
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-neutral-500">
                  <span className="text-neutral-900">Note:</span> Employee will
                  receive an email containing their employee no. & temporary
                  password to login to the account. It is recommended to change
                  the password after first login. <br /> <br />
                  Do not use Dr. / Mr. / Mrs. / Ms. in the name field. If the
                  role is pathologist, Dr. will be prefixed automatically.
                </p>
              </div>
            </details>
          </div>
        </div>
      );
    }
  }
}

export default CreatePerson;
