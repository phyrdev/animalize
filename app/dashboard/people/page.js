/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Progress,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import PermissionDenied from "../components/PermissionDenied";
import FRow from "../facilities/components/FRow";
import FCard from "../facilities/components/FCard";
import { useRouter } from "next/navigation";
import { permissions } from "@/static/permissions";
import { getEmployees } from "@/prisma/employee";
import PRow from "./components/PRow";
import { getRole } from "@/helper/refactor";
import PCard from "./components/PCard";
import GlobalState from "@/context/GlobalState";

function People() {
  const router = useRouter();
  //const [employees, setEmployees] = useState([]);
  const [visibleEmployees, setVisibleEmployees] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { employees, refreshOrgEmployees, loading } = useContext(GlobalState);

  const session = useSession();

  //   const getOrgEmployees = async () => {
  //     let { success, data, message } = await getEmployees(
  //       session.data.user.orgno
  //     );
  //     if (success) {
  //       setEmployees(data);
  //       setVisibleEmployees(data);
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    if (session.status == "authenticated") {
      if (permissions.manageEmployees.includes(session.data.user.role)) {
        if (employees.length > 0) {
          setVisibleEmployees(employees);
        }
      }
    }
  }, [session.status, employees]);

  useEffect(() => {
    if (searchQuery == "") {
      setVisibleEmployees(employees);
    } else {
      let filteredEmployees = employees.filter((employee) => {
        return employee.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setVisibleEmployees(filteredEmployees);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchOpen) {
      document.getElementById("search-input").focus();
    }
  }, [searchOpen]);

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
            </Breadcrumbs>
            <span className="text-xl font-semibold md:hidden">People</span>
            <Button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setVisibleEmployees(employees);
                setSearchQuery("");
              }}
              isIconOnly
              className="ml-auto rounded-md bg-neutral-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.55}
                  d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                ></path>
              </svg>
            </Button>

            {permissions.manageEmployees.includes(session.data.user.role) && (
              <Button
                onClick={() => {
                  router.push("/dashboard/people/create");
                }}
                className="ml-3 w-fit md:px-6 md:ml-5 h-10 rounded-md bg-neutral-800 text-white"
              >
                Add person
              </Button>
            )}
          </div>

          {loading == true ? (
            <Progress
              radius="none"
              size="sm"
              classNames={{
                indicator: "bg-neutral-400 h-1",
              }}
              isIndeterminate
            />
          ) : (
            <>
              {searchOpen && (
                <div className="h-12 border-y md:border-b-0 flex items-center px-5 md:px-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    className="shrink-0"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.55}
                      d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                    ></path>
                  </svg>
                  <input
                    type="text"
                    id="search-input"
                    placeholder="Search for an employee..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm outline-none h-full w-full ml-3"
                    name=""
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setVisibleEmployees(employees);
                      setSearchQuery("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 36 36"
                    >
                      <path
                        fill="currentColor"
                        d="m19.41 18l8.29-8.29a1 1 0 0 0-1.41-1.41L18 16.59l-8.29-8.3a1 1 0 0 0-1.42 1.42l8.3 8.29l-8.3 8.29A1 1 0 1 0 9.7 27.7l8.3-8.29l8.29 8.29a1 1 0 0 0 1.41-1.41Z"
                        className="clr-i-outline clr-i-outline-path-1"
                      ></path>
                      <path fill="none" d="M0 0h36v36H0z"></path>
                    </svg>
                  </button>
                </div>
              )}
              <div className="hidden md:block whitespace-nowrap overflow-auto shrink-0 pb-24">
                <table className="w-fit lg:w-full text-left">
                  <thead className="bg-neutral-100 border-y">
                    <tr>
                      <th className="font-medium px-5 py-4 text-sm first:pl-10">
                        S. no.
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">Emp. no</th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Employee name
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">Role</th>
                      <th className="font-medium px-5 py-4 text-sm">Phone</th>
                      <th className="font-medium px-5 py-4 text-sm">Email</th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Date of joining
                      </th>
                      <th className="font-medium px-5 py-4 text-sm"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleEmployees.map((employee, index) => {
                      return (
                        <PRow
                          key={employee.id}
                          person={employee}
                          index={index}
                          deleteCallback={refreshOrgEmployees}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-5 md:hidden mt-5">
                <div className="flex items-center text-sm text-neutral-600">
                  <span>0 - 10 of {employees.length}&nbsp;employees</span>
                </div>

                <ul className="mt-5 space-y-2">
                  {visibleEmployees.map((person, index) => {
                    return (
                      <PCard
                        key={person.id}
                        person={person}
                        index={index}
                        deleteCallback={refreshOrgEmployees}
                      />
                    );
                  })}
                </ul>
              </div>
            </>
          )}
        </div>
      );
    }
  }
}

export default People;
