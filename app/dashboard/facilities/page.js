/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { permissions } from "@/static/permissions";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Progress,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import PermissionDenied from "../components/PermissionDenied";
import { getFacilities } from "@/prisma/facility";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";
import FCard from "./components/FCard";
import FRow from "./components/FRow";
import GlobalState from "@/context/GlobalState";

function Facilities() {
  const router = useRouter();
  const session = useSession();

  //   const [facilities, setFacilities] = useState([]);
  const [visibleFacilities, setVisibleFacilities] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { facilities, refreshOrgFacilities, loading } = useContext(GlobalState);

  //   const getOrgFacilities = async () => {
  //     let { success, data, message } = await getFacilities(
  //       session.data.user.orgno
  //     );
  //     console.log(success, data, message);
  //     if (success) {
  //       setFacilities(data);
  //       setVisibleFacilities(data);
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    if (session.status == "authenticated") {
      if (permissions.manageFacilities.includes(session.data.user.role)) {
        if (facilities.length > 0) {
          setVisibleFacilities(facilities);
        }
      }
    }
  }, [session.status, facilities]);

  useEffect(() => {
    if (searchQuery == "") {
      setVisibleFacilities(facilities);
    } else {
      let filteredFacilities = facilities.filter((facility) => {
        return facility.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setVisibleFacilities(filteredFacilities);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchOpen) {
      document.getElementById("search-input").focus();
    }
  }, [searchOpen]);

  if (session.status == "authenticated") {
    if (
      permissions.manageFacilities.includes(session.data.user.role) == false
    ) {
      return <PermissionDenied />;
    } else {
      return (
        <div>
          <div className="px-5 md:px-10 py-5 flex items-center">
            <Breadcrumbs className="hidden md:block">
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
              <BreadcrumbItem>Facilities</BreadcrumbItem>
            </Breadcrumbs>
            <span className="text-xl font-semibold md:hidden">Facilities</span>
            <Button
              onClick={() => {
                setSearchOpen(!searchOpen);
                setVisibleFacilities(facilities);
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

            {permissions.manageFacilities.includes(session.data.user.role) && (
              <Button
                onClick={() => {
                  router.push("/dashboard/facilities/create");
                }}
                className="ml-3 w-fit md:px-6 md:ml-5 h-10 rounded-md bg-neutral-800 text-white"
              >
                Add Facility
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
                    placeholder="Search for a facility"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm outline-none h-full w-full ml-3"
                    name=""
                  />
                  <button
                    onClick={() => {
                      setSearchOpen(false);
                      setVisibleFacilities(facilities);
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
                        Facility name
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">Cost</th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Available
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Created on
                      </th>
                      <th className="font-medium px-5 py-4 text-sm">
                        Average time
                      </th>
                      <th className="font-medium px-5 py-4 text-sm"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleFacilities.map((facility, index) => {
                      return (
                        <FRow
                          facility={facility}
                          key={index}
                          index={index}
                          deleteCallback={() => getOrgFacilities()}
                        />
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-5 md:hidden mt-5">
                <div className="flex items-center text-sm text-neutral-600">
                  <span>0 - 10 of {facilities.length}&nbsp;facilities</span>
                </div>

                <ul className="mt-5 space-y-2">
                  {visibleFacilities.map((facility, index) => {
                    return (
                      <FCard
                        facility={facility}
                        key={index}
                        index={index}
                        deleteCallback={() => getOrgFacilities()}
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

export default Facilities;
