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
  const [selectedForPreview, setSelectedForPreview] = useState(null);

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
          <button
            onClick={() => {
              setSelectedForPreview(facility);
            }}
            className="ml-auto hover:bg-neutral-200 h-10 w-10 rounded transition-all flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
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
          <button
            onClick={() => {
              setSelectedForPreview(facility);
            }}
            className="bg-sky-100 hover:bg-sky-200 h-10 w-10 rounded transition-all flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={18}
              height={18}
              viewBox="0 0 24 24"
            >
              <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                <path d="M16 12a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path>
                <path d="M12 3c5.592 0 10.29 3.824 11.622 9c-1.332 5.176-6.03 9-11.622 9S1.71 17.176.378 12C1.71 6.824 6.408 3 12 3m0 16c-4.476 0-8.269-2.942-9.543-7C3.731 7.942 7.524 5 12 5c4.476 0 8.269 2.942 9.543 7c-1.274 4.058-5.067 7-9.543 7"></path>
              </g>
            </svg>
          </button>
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
    let { success, data } = await getFacilities(orgno);
    console.log(success, data);
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
            <Button isIconOnly className="ml-auto rounded-md bg-neutral-100">
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
                    {facilities.map((facility, index) => {
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
              <div className="px-5 md:hidden">
                <div className="flex items-center text-sm text-neutral-600">
                  <span>0 - 10 of {facilities.length}&nbsp;facilities</span>
                </div>

                <ul className="mt-5 space-y-2">
                  {facilities.map((facility, index) => {
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

              {selectedForPreview && (
                <div className="fixed inset-0 h-full w-full bg-black/50 z-20 flex items-end md:items-center justify-center">
                  <div className="w-full md:w-[450px] md:h-fit h-1/2 max-h-svh md:max-h-[700px] overflow-auto bg-white md:rounded-md">
                    <div className="p-5">
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="1.55"
                            d="M6 18h8M3 22h18m-7 0a7 7 0 1 0 0-14h-1m-4 6h2m-2-2a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Zm3-6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"
                          />
                        </svg>
                        <h2 className="text-lg font-medium ml-2">
                          {selectedForPreview.name}
                        </h2>
                        <button
                          onClick={() => {
                            setSelectedForPreview(null);
                          }}
                          className="ml-auto text-neutral-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.55"
                              d="M18 6L6 18M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="mt-5 space-y-3">
                        <p className="text-sm text-neutral-700">
                          Created on:&nbsp;
                          {new Date(
                            selectedForPreview.createdAt
                          ).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-neutral-700">
                          Average time:&nbsp;{selectedForPreview.duration} hrs
                        </p>
                        <p className="text-sm text-neutral-700">
                          Cost:&nbsp;{" "}
                          {getCurrencySymbol(session.data.user.currency)}
                          {selectedForPreview.cost}
                        </p>
                        <p className="text-sm text-neutral-700">
                          Availability:&nbsp;
                          {capitalizeFirstLetter(
                            selectedForPreview.availability
                          )}
                        </p>
                      </div>

                      <div className="mt-5">
                        <ul>
                          <li className="text-sm text-neutral-700 grid grid-cols-4 font-medium bg-neutral-100 px-2 py-2">
                            <span>Parameter</span>
                            <span>Description</span>
                            <span>Unit</span>
                            <span>Normal range</span>
                          </li>
                          {selectedForPreview.parameters.map(
                            (parameter, index) => {
                              return (
                                <li
                                  key={index}
                                  className="text-sm text-neutral-700 grid grid-cols-4 px-2 mt-3"
                                >
                                  <span>{parameter.name}</span>
                                  <span>{parameter.desciption}</span>
                                  <span>{parameter.unit}</span>
                                  <span>
                                    {parameter.low}-{parameter.high}
                                  </span>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
  }
}

export default Facilities;
