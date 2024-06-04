"use client";
import { permissions } from "@/static/permissions";
import { BreadcrumbItem, Breadcrumbs, Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

function Facilities() {
  const router = useRouter();
  const session = useSession();
  if (session.status == "authenticated") {
    if (
      permissions.manageFacilities.includes(session.data.user.role) == false
    ) {
      return (
        <div className="p-5 md:p-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M18.5 11.25c-1.272 0-2.372.89-2.636 2.135l-.022.104a2.84 2.84 0 0 0-.036.973l.153 1.112l-.17.022a1.765 1.765 0 0 0-1.539 1.75v2.307c0 .888.658 1.637 1.538 1.751c1.8.234 3.624.234 5.424 0a1.765 1.765 0 0 0 1.538-1.75v-2.307c0-.888-.658-1.637-1.538-1.751a19.559 19.559 0 0 0-.171-.022l.153-1.112a2.828 2.828 0 0 0-.036-.973l-.022-.104A2.695 2.695 0 0 0 18.5 11.25m1.044 4.196l.164-1.189c.02-.152.015-.306-.017-.456l-.022-.104a1.195 1.195 0 0 0-2.338 0l-.022.104c-.032.15-.037.304-.017.456l.164 1.19a21.077 21.077 0 0 1 2.088 0m-3.563 1.637a19.564 19.564 0 0 1 5.038 0c.132.018.231.13.231.264v2.306a.265.265 0 0 1-.231.264a19.555 19.555 0 0 1-5.038 0a.265.265 0 0 1-.231-.264v-2.306c0-.134.099-.246.231-.264"
              clipRule="evenodd"
            ></path>
            <path
              fill="currentColor"
              d="M12.75 18.365a.301.301 0 0 0-.303-.3a71.146 71.146 0 0 1-5.527-.18l-1.514-.109a1.128 1.128 0 0 1-1.03-.922a22.73 22.73 0 0 1-.208-6.796l.273-2.27A1.18 1.18 0 0 1 5.61 6.75h2.292c.44 0 .797.357.797.797c0 .585.474 1.06 1.06 1.06h8.712c.57 0 1.054.413 1.144.975l.013.083a.425.425 0 0 0 .282.329c.351.125.682.297.985.508c.15.105.372-.013.347-.195a22.126 22.126 0 0 0-.082-.56l-.064-.402a2.658 2.658 0 0 0-2.625-2.239h-8.314A2.298 2.298 0 0 0 7.903 5.25H5.612a2.68 2.68 0 0 0-2.66 2.36l-.273 2.27a24.23 24.23 0 0 0 .222 7.243a2.629 2.629 0 0 0 2.398 2.15l1.514.108c1.877.134 3.759.195 5.64.184a.299.299 0 0 0 .297-.3z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold mt-4">Forbidden</h2>
          <p className="text-base mt-3 leading-7 text-neutral-700">
            You dont have necessary permissions to access this page. Please
            refer to your administrator.
          </p>
          <Button className="mt-4 bg-neutral-200 rounded-md">
            Create an issue
          </Button>
        </div>
      );
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
                  <th className="font-medium px-5 py-4 text-sm">Available</th>
                  <th className="font-medium px-5 py-4 text-sm">Created on</th>
                  <th className="font-medium px-5 py-4 text-sm">
                    Average time
                  </th>
                  <th className="font-medium px-5 py-4 text-sm">Action</th>
                  <th className="font-medium px-5 py-4 text-sm"></th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-neutral-50">
                  <td className="font-normal px-5 py-4 text-sm first:pl-10">
                    1
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">LE-90012</td>
                  <td className="font-normal px-5 py-4 text-sm">2 Jun 2024</td>
                  <td className="font-normal px-5 py-4 text-sm">Roxy</td>
                  <td className="font-normal px-5 py-4 text-sm">
                    Ready for S. coll.
                  </td>
                  <td className="font-normal px-5 py-4 text-sm">Paid</td>
                  <td className="font-normal px-5 py-4 text-sm">2 Jun 2024</td>
                  <td className="font-normal py-4 text-sm inline-flex items-center gap-2">
                    <button className="bg-sky-100 hover:bg-sky-200 h-10 w-10 rounded transition-all flex items-center justify-center">
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
              </tbody>
            </table>
          </div>
          <div className="px-5 md:hidden">
            <div className="flex items-center text-sm text-neutral-600">
              <span>0-24 of 100 reports</span>
            </div>

            <ul className="mt-5">
              <li className="bg-neutral-100 p-4">
                <h2 className="text-lg font-semibold">C.B.C</h2>
                <div className="mt-3 flex items-center">
                  <span className="text-sm text-neutral-700">₹2500</span>
                  <span className="text-sm text-neutral-600 ml-auto">
                    Available
                  </span>
                </div>

                <p className="text-sm text-neutral-700 mt-3">
                  Created on: 2 Jun 2024
                </p>

                <p className="text-sm text-neutral-700 mt-2">
                  Average time: 2 days
                </p>

                <div className="font-normal mt-3 text-sm items-center flex">
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
        </div>
      );
    }
  }
}

export default Facilities;
