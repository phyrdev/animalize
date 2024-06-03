"use client";
import React, { Suspense } from "react";
import Nav from "./components/Nav";

function layout({ children }) {
  return (
    <div className="md:h-svh md:max-h-svh overflow-hidden flex">
      <Nav />
      <div className="w-full h-full md:overflow-y-auto pb-24">
        <Suspense>{children}</Suspense>
      </div>
    </div>
  );
}

export default layout;
