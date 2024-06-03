"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumbs, BreadcrumbItem, Button } from "@nextui-org/react";
import Link from "next/link";
function Reports() {
  return (
    <div>
      <div className="px-5 md:px-10 py-5 flex items-center">
        <Breadcrumbs className="hidden md:block">
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Reports</BreadcrumbItem>
        </Breadcrumbs>
        <span className="text-xl font-semibold md:hidden">Reports</span>
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

        <Link href="/dashboard/reports/create">
          <Button className="ml-3 w-fit md:px-6 md:ml-5 h-10 rounded-md bg-neutral-800 text-white">
            Create report
          </Button>
        </Link>
      </div>
      {
        // desktop view
      }

      <div className="hidden md:block whitespace-nowrap overflow-auto shrink-0 pb-24">
        <table className="w-fit lg:w-full text-left">
          <thead className="bg-neutral-100 border-y">
            <tr>
              <th className="font-medium px-5 py-4 text-sm first:pl-10">
                S. no.
              </th>
              <th className="font-medium px-5 py-4 text-sm">Report no.</th>
              <th className="font-medium px-5 py-4 text-sm">Date created</th>
              <th className="font-medium px-5 py-4 text-sm">Pet name</th>
              <th className="font-medium px-5 py-4 text-sm">Report status</th>
              <th className="font-medium px-5 py-4 text-sm">Payment status</th>
              <th className="font-medium px-5 py-4 text-sm">Action</th>
              <th className="font-medium px-5 py-4 text-sm"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-neutral-50">
              <td className="font-normal px-5 py-4 text-sm first:pl-10">1</td>
              <td className="font-normal px-5 py-4 text-sm">LE-90012</td>
              <td className="font-normal px-5 py-4 text-sm">2 Jun 2024</td>
              <td className="font-normal px-5 py-4 text-sm">Roxy</td>
              <td className="font-normal px-5 py-4 text-sm">
                Ready for S. coll.
              </td>
              <td className="font-normal px-5 py-4 text-sm">Paid</td>
              <td className="font-normal px-5 py-4 text-sm">
                <Button className="rounded-md bg-transparent border border-neutral-400">
                  Collect sample
                </Button>
              </td>
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

      {
        // mobile view
      }

      <div className="px-5 md:hidden">
        <div className="flex items-center text-sm text-neutral-600">
          <span>0-24 of 100 reports</span>
        </div>

        <ul className="mt-5">
          <li className="bg-neutral-100 p-4">
            <div className="flex items-center text-sm">
              <span className="">LE-90012</span>
              <span className="ml-auto text-neutral-600">2 Jun 2024</span>
            </div>
            <h2 className="text-lg font-semibold mt-3">Roxy</h2>
            <div className="mt-2 flex items-center">
              <span className="text-sm text-neutral-700">
                Ready for S. coll.
              </span>
              <span className="text-sm text-neutral-600 ml-auto">Paid</span>
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
        </ul>
      </div>

      {
        // create report modal
      }

      {/* <div className="fixed inset-0 h-full w-full bg-black/50 flex justify-center items-center">
        <div className="bg-white rounded-lg p-5 h-[500px] w-full md:w-1/2">
          <div className="flex items-center">
            <button className="text-neutral-600 ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <g fill="none" fill-rule="evenodd">
                  <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path
                    fill="currentColor"
                    d="m12 13.414l5.657 5.657a1 1 0 0 0 1.414-1.414L13.414 12l5.657-5.657a1 1 0 0 0-1.414-1.414L12 10.586L6.343 4.929A1 1 0 0 0 4.93 6.343L10.586 12l-5.657 5.657a1 1 0 1 0 1.414 1.414z"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Reports;
