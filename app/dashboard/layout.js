"use client";
import React from "react";
import Nav from "./components/Nav";

function layout({ children }) {
  return (
    <div className="md:h-svh md:max-h-svh overflow-hidden flex">
      <Nav />
      <div className="w-full h-full md:overflow-y-auto">{children}</div>
    </div>
  );
}

export default layout;
