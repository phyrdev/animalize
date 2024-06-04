/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { permissions } from "@/static/permissions";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Spinner,
} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import PermissionDenied from "../components/PermissionDenied";
import { getFacilities } from "@/prisma/facility";
import { capitalizeFirstLetter, getCurrencySymbol } from "@/helper/refactor";

function Facilities() {
  const router = useRouter();
  const session = useSession();

  const [facilities, setFacilities] = useState([]);
  const [visibleFacilities, setVisibleFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const FacilityCard = ({ facility, index }) => {
    return (
      <li className="bg-neutral-100 p-4">
        <h2 className="text-lg font-semibold">{facility.name}</h2>
        <div className="mt-3 flex items-center">
          <span className="text-sm text-neutral-700">
            {getCurrencySymbol(session.data.user.currency)}&nbsp;
            {facility.cost}
          </span>
          <span className="text-sm text-neutral-600 ml-auto">
            {capitalizeFirstLetter(facility.availability)}
          </span>
        </div>

        <p className="text-sm text-neutral-700 mt-3">
          Created on:&nbsp;
          {new Date(facility.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <p className="text-sm text-neutral-700 mt-2">
          Average time:&nbsp;
          {facility.duration} hrs
        </p>

        <div className="font-normal mt-3 text-sm items-center flex">
          <button className="ml-auto hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center">
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
    );
  };

  const FacilityRow = ({ facility, index }) => {
    return (
      <tr className="border-b hover:bg-neutral-50">
        <td className="font-normal px-5 py-4 text-sm first:pl-10">
          {index + 1}
        </td>
        <td className="font-normal px-5 py-4 text-sm">{facility.name}</td>
        <td className="font-normal px-5 py-4 text-sm">
          {getCurrencySymbol(session.data.user.currency)}&nbsp;
          {facility.cost}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {capitalizeFirstLetter(facility.availability)}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {new Date(facility.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </td>
        <td className="font-normal px-5 py-4 text-sm">
          {facility.duration} hrs
        </td>
        <td className="font-normal py-4 text-sm inline-flex items-center gap-2">
          <button className="bg-neutral-100 hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center">
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
          <button className="h-10 w-10 rounded transition-all flex items-center justify-center">
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
        </td>
      </tr>
    );
  };

  const getOrgFacilities = async (orgno) => {
    let { success, data, message } = await getFacilities(orgno);
    console.log(success, data, message);
    if (success) {
      setFacilities(data);
      setVisibleFacilities(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      if (permissions.manageFacilities.includes(session.data.user.role)) {
        if (facilities.length == 0) {
          getOrgFacilities(session.data.user.orgno);
        }
      }
    }
  }, [session.status]);

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
                    placeholder="Search for a facility"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-transparent text-sm outline-none h-full w-full ml-3"
                    name=""
                    id=""
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
                        <FacilityRow
                          facility={facility}
                          key={index}
                          index={index}
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
                      <FacilityCard
                        facility={facility}
                        key={index}
                        index={index}
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
