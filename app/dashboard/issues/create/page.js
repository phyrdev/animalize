/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import PermissionDenied from "../../components/PermissionDenied";
import { permissions } from "@/static/permissions";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import CustomSelect from "../../components/CustomSelect";
import CustomInput from "../../components/CustomInput";
import { issuepriorities, issuestatus } from "@/static/lists";
import { createIssue } from "@/prisma/issue";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

function CreateIssue() {
  const params = useSearchParams();
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState([]);
  const [tIssue, setTIssue] = useState({
    title: "",
    description: "",
    status: "open",
    priority: "low",
    orgno: "",
    empno: "",
  });

  const handleSave = async () => {
    if (tIssue.title == "" || tIssue.description == "") {
      toast.error("Please fill all fields.");
      return false;
    }

    setLoading(true);
    let { success, message } = await createIssue(tIssue, emails);
    if (success) {
      toast.success("Issue created successfully");
      router.push("/dashboard/issues");
    } else {
      toast.error(message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      if (permissions.createIssue.includes(session.data.user.role)) {
        setTIssue({
          ...tIssue,
          orgno: session.data.user.orgno,
          empno: session.data.user.empno,
          title: params.get("title") || "",
          description: params.get("description") || "",
          priority: params.get("priority") || "low",
        });
        setEmails(
          params.get("emails")?.split(",") || [session.data.user.orgemail]
        );
      }
    }
  }, [session.status]);

  if (session.status == "authenticated") {
    if (permissions.createIssue.includes(session.data.user.role) == false) {
      return <PermissionDenied />;
    } else {
      return (
        <div>
          <div className="px-5 md:px-10 py-5 flex items-center">
            <Breadcrumbs className="hidden md:block">
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
              <BreadcrumbItem>Issues</BreadcrumbItem>
              <BreadcrumbItem>Create</BreadcrumbItem>
            </Breadcrumbs>
            <span className="text-xl font-semibold md:hidden">
              Create issue
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

            <Button
              onClick={() => handleSave()}
              isLoading={loading}
              isDisabled={loading}
              className="ml-3 w-fit md:px-6 md:ml-5 h-10 rounded-md bg-neutral-800 text-white"
            >
              Save issue
            </Button>
          </div>
          <div className="md:px-10 px-5 mt-5 max-w-4xl">
            <details id="details-fill-dd" open>
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Issue details
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
                  <CustomInput
                    label="Title"
                    value={tIssue.title}
                    onChange={(e) =>
                      setTIssue({ ...tIssue, title: e.target.value })
                    }
                    placeholder={"Issue title"}
                  />

                  <CustomSelect
                    label="Priority"
                    value={tIssue.priority}
                    onChange={(e) =>
                      setTIssue({ ...tIssue, priority: e.target.value })
                    }
                    options={issuepriorities}
                  />

                  <div className="md:col-span-2 flex border-b md:border rounded">
                    <div className="w-24 bg-neutral-50 border-r shrink-0 p-3 text-neutral-500">
                      <span className="text-sm">Message</span>
                    </div>
                    <textarea
                      rows={3}
                      value={tIssue.description}
                      onChange={(e) =>
                        setTIssue({
                          ...tIssue,
                          description: e.target.value,
                        })
                      }
                      className="w-full p-4 resize-y outline-none bg-transparent"
                      placeholder="Describe the issue here"
                    ></textarea>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-neutral-500">
                  <span className="text-neutral-900">Note:</span> Admins can
                  view your employee number while creating an issue.
                </p>
              </div>
            </details>
          </div>
        </div>
      );
    }
  }
}

export default CreateIssue;
