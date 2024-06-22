/* eslint-disable @next/next/no-img-element */
"use client";
import React, { Suspense } from "react";
import Nav from "./components/Nav";
import { signOut, useSession } from "next-auth/react";
import { Button, Progress, Spinner } from "@nextui-org/react";

function Layout({ children }) {
  const session = useSession();
  return (
    <div className="md:h-svh md:max-h-svh overflow-hidden flex">
      <Nav />
      <div className="w-full h-full md:overflow-y-auto pb-24">
        <Suspense>{children}</Suspense>
      </div>

      {(session.status == "loading" || session.status == "unauthenticated") && (
        <div className="fixed inset-0 z-20 bg-white h-full w-full flex items-center justify-center">
          <div className="w-fit h-fit flex flex-col items-center justify-center">
            <Spinner color="current" />
            <h1 className="text-lg font-medium mt-8">
              Estabilishing secure connection
            </h1>
            <p className="mt-2 text-sm">This may take some time</p>
            <div className="flex items-center justify-center text-sm mt-6 space-x-4">
              <button
                onClick={() => location.reload()}
                className="bg-neutral-100 px-4 py-2 rounded-sm"
              >
                Refresh
              </button>
              <button onClick={() => signOut()} className="py-2">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
