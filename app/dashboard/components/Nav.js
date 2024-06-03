"use client";
import { navmenuitems } from "@/static/lists";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function Nav() {
  const [current, setCurrent] = useState("dashboard");
  const pathname = usePathname();
  const session = useSession();

  useEffect(() => {
    const path = pathname.split("/");
    path.splice(0, 1);

    switch (path.length) {
      case 1:
        console.log(`/${path[0]}`);
        setCurrent(`/${path[0]}`);
        break;
      default:
        setCurrent(`/${path[0]}/${path[1]}`);
        break;
    }
  }, [pathname]);

  const SideBar = () => {
    return (
      <div className="w-[270px] bg-neutral-100 h-full hidden md:block shrink-0 border-r">
        <div className="p-5">
          <div className="flex items-center space-x-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M5.25 4a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0m12 12a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M16 11.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M17.25 4a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M10 17.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M11.25 10a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M10 5.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5M5.25 16a1.25 1.25 0 1 1-2.5 0a1.25 1.25 0 0 1 2.5 0M4 11.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5"
              ></path>
            </svg>
            <span>Lenus labs</span>
          </div>
        </div>
        <div className="flex mt-4 items-center px-5 py-3">
          <div className="h-12 w-12 bg-neutral-200 rounded-md flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M15.71 12.71a6 6 0 1 0-7.42 0a10 10 0 0 0-6.22 8.18a1 1 0 0 0 2 .22a8 8 0 0 1 15.9 0a1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1a10 10 0 0 0-6.25-8.19M12 12a4 4 0 1 1 4-4a4 4 0 0 1-4 4"
              ></path>
            </svg>
          </div>
          <div className="ml-4">
            <p className="text-sm text-neutral-600">Good morning</p>
            <p className="mt-1 font-medium">Priyangsu Banerjee</p>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex items-center px-5">
            <span className="text-sm font-semibold text-neutral-600 shrink-0">
              Controls
            </span>
            <div className="w-full h-[1px] bg-neutral-300 ml-3"></div>
          </div>

          <ul className="px-5 mt-6 space-y-2">
            {navmenuitems.map((item, index) => {
              if (item.access.includes(session?.data?.user?.role) == false)
                return;
              return (
                <li
                  key={index}
                  style={{
                    backgroundColor: current === item.path ? "#1b1b1b" : "",
                    color: current === item.path ? "#fff" : "",
                  }}
                  className="flex items-center cursor-pointer rounded-md hover:bg-neutral-200"
                >
                  <Link href={item.path} className="w-full px-4 py-3 group">
                    <div className="w-full flex items-center">
                      {item.icon}
                      <span className="text-sm ml-3">{item.name}</span>
                      <button className="ml-auto group-hover:translate-x-2 transition-all">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                            <path
                              fill="currentColor"
                              d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z"
                            ></path>
                          </g>
                        </svg>
                      </button>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-16">
          <div className="flex items-center px-5">
            <span className="text-sm font-semibold text-neutral-600 shrink-0">
              Quick access
            </span>
            <div className="w-full h-[1px] bg-neutral-300 ml-3"></div>
          </div>

          <ul className="px-5 mt-6 space-y-2">
            <li className="flex items-center px-4 py-3 cursor-pointer rounded-md hover:bg-neutral-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M12 13v5m0 3.01l.01-.011M4 13.5l-.485.121A2 2 0 0 0 2 15.561v1.877a2 2 0 0 0 1.515 1.94l1.74.436A.6.6 0 0 0 6 19.23v-5.463a.6.6 0 0 0-.746-.582zm0 0V13c0-4.97 3.582-9 8-9s8 4.03 8 9v.5m0 0l.485.121A2 2 0 0 1 22 15.561v1.877a2 2 0 0 1-1.515 1.94l-1.74.436A.6.6 0 0 1 18 19.23v-5.463a.6.6 0 0 1 .745-.582z"
                ></path>
              </svg>
              <span className="text-sm ml-3">Report an issue</span>
              <button className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill="currentColor"
                      d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z"
                    ></path>
                  </g>
                </svg>
              </button>
            </li>
            <li
              onClick={() => signOut()}
              className="flex items-center px-4 py-3 cursor-pointer rounded-md hover:bg-neutral-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 3.25a.75.75 0 0 1 0 1.5a7.25 7.25 0 0 0 0 14.5a.75.75 0 0 1 0 1.5a8.75 8.75 0 1 1 0-17.5"
                ></path>
                <path
                  fill="currentColor"
                  d="M16.47 9.53a.75.75 0 0 1 1.06-1.06l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H10a.75.75 0 0 1 0-1.5h8.19z"
                ></path>
              </svg>
              <span className="text-sm ml-3">Logout</span>
              <button className="ml-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path
                      fill="currentColor"
                      d="M15.707 11.293a1 1 0 0 1 0 1.414l-5.657 5.657a1 1 0 1 1-1.414-1.414l4.95-4.95l-4.95-4.95a1 1 0 0 1 1.414-1.414z"
                    ></path>
                  </g>
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const BottomNav = () => {
    return (
      <div className="w-full h-14 bg-neutral-100 fixed bg-fixed bottom-0 inset-x-0 md:hidden z-20">
        <div className="flex items-center justify-evenly h-full">
          {navmenuitems.map((item, index) => {
            if (item.visibleSm == false) return;
            if (item.access.includes(session?.data?.user?.role) == false)
              return;
            return (
              <Link
                key={index}
                href={item.path}
                style={{
                  backgroundColor: current === item.path ? "#1b1b1b" : "",
                  color: current === item.path ? "#fff" : "",
                }}
                className="h-10 w-10 flex items-center justify-center rounded-md"
              >
                {item.icon}
              </Link>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <SideBar />
      <BottomNav />
    </>
  );
}

export default Nav;
