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
import PCard from "./components/PCard";

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
                      <th className="font-medium px-5 py-4 text-sm">Mode</th>
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
              <div className="px-5 md:hidden mt-5">
                <div className="flex items-center text-sm text-neutral-600">
                  <span>0-24 of 100 reports</span>
                </div>

                <ul className="mt-5 space-y-3">
                  {visiblePayments.map((payment, index) => {
                    return (
                      <PCard
                        payment={payment}
                        index={index}
                        flagCallback={getOrganizationPayments}
                        key={index}
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

export default Payments;
