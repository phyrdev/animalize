"use client";
import React from "react";
import Nav from "./components/Nav";

function layout({ children }) {
  return (
    <div className="h-svh max-h-svh overflow-hidden flex">
      <Nav />
      <div className="w-full h-full overflow-y-auto">{children}</div>
    </div>
  );
}

export default layout;
