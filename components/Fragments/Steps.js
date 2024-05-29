/* eslint-disable @next/next/no-img-element */
import React from "react";

function Steps() {
  return (
    <div>
      <div className="py-5 hidden md:block bg-gray-50 mt-24 max-w-6xl px-10 mx-auto rounded-xl">
        <img src="/steps-lg.svg" className="mx-auto" alt="" />
      </div>

      <div className="block md:hidden bg-gray-100 py-16 mt-16">
        <img src="/steps-sm.svg" className="mx-auto" alt="" />
      </div>
    </div>
  );
}

export default Steps;
