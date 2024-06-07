"use client";
import React, { Suspense } from "react";
import Nav from "./components/Nav";
import { useSession } from "next-auth/react";
import { Spinner } from "@nextui-org/react";

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
          <div className="flex flex-col items-center justify-center">
            <Spinner />
          </div>
        </div>
      )}
    </div>
  );
}

export default Layout;
