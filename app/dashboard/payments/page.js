/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { permissions } from "@/static/permissions";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import PermissionDenied from "../components/PermissionDenied";
import { getOrgPayments } from "@/prisma/payments";
import { capitalizeFirstLetter } from "@/helper/refactor";
import PRow from "./components/PRow";

function Payments() {
  const session = useSession();

  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visiblePayments, setVisiblePayments] = useState([]);
  const [payments, setPayments] = useState([]);

  const getOrganizationPayments = async () => {
    let { success, data, message } = await getOrgPayments(
      session.data.user.orgno
    );

    if (success) {
      setPayments(data);
      setVisiblePayments(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery == "") {
      setVisiblePayments(payments);
    } else {
      let filteredPayments = payments.filter((payment) => {
        return payment.report.reportno
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });

      setVisiblePayments(filteredPayments);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchOpen) {
      document.getElementById("search-input").focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    if (session.status == "authenticated") {
      payments.length == 0 && getOrganizationPayments();
    }
  }, [session.status]);

  if (session.status == "authenticated") {
    if (permissions.managePayments.includes(session.data.user.role) == false) {
      return <PermissionDenied />;
    } else {
      return (
        <div>
          <div className="px-5 md:px-10 py-5 flex items-center">
            <Breadcrumbs className="hidden md:block">
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
              <BreadcrumbItem>Payments</BreadcrumbItem>
            </Breadcrumbs>
            <span className="text-xl font-semibold md:hidden">Payments</span>
            <Button
              onClick={() => setSearchOpen(!searchOpen)}
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
          </div>

          {loading == true ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
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
                    placeholder="Search for a facility"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm outline-none h-full w-full ml-3"
                    name=""
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setVisiblePayments(payments);
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
                      <th className="font-medium px-5 py-4 text-sm">
                        Report no.
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">Date</th>
                      <th className="font-medium px-5 py-4 text-sm">Status</th>
                      <th className="font-medium px-5 py-4 text-sm">Total</th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Paid amount
                      </th>
                      <th className="font-medium px-5 py-4 text-sm"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visiblePayments.map((payment, index) => {
                      return (
                        <PRow
                          payment={payment}
                          index={index}
                          key={index}
                          flagCallback={getOrganizationPayments}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-5 md:hidden">
                <div className="flex items-center text-sm text-neutral-600">
                  <span>0-24 of 100 reports</span>
                </div>

                <ul className="mt-5">
                  <li className="bg-neutral-100 p-4">
                    <div className="flex items-center text-sm">
                      <span className="">LE-90012</span>
                      <span className="ml-auto text-neutral-600">
                        2 Jun 2024
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold mt-3">Roxy</h2>
                    <div className="mt-2 flex items-center">
                      <span className="text-sm text-neutral-700">
                        Ready for S. coll.
                      </span>
                      <span className="text-sm text-neutral-600 ml-auto">
                        Paid
                      </span>
                    </div>
                    <div className="font-normal mt-5 text-sm items-center flex">
                      <Button className="rounded-md bg-transparent border border-neutral-400">
                        Collect sample
                      </Button>
                      <button className="ml-auto hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={18}
                          height={18}
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          >
                            <path d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path>
                            <path d="M12 3c5.592 0 10.29 3.824 11.622 9c-1.332 5.176-6.03 9-11.622 9S1.71 17.176.378 12C1.71 6.824 6.408 3 12 3m0 16c-4.476 0-8.269-2.942-9.543-7C3.731 7.942 7.524 5 12 5c4.476 0 8.269 2.942 9.543 7c-1.274 4.058-5.067 7-9.543 7"></path>
                          </g>
                        </svg>
                      </button>
                      <button className="ml-2 hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center">
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
                      <button className="ml-2 hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center">
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
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      );
    }
  }
}

export default Payments;
