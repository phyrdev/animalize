/* eslint-disable @next/next/no-img-element */
import React from "react";

function HeroSection() {
  return (
    <div className="max-w-6xl mx-auto mt-7 md:mt-16">
      <div className="px-4">
        <h1 className="text-[28px] md:text-[40px] text-center font-semibold text-neutral-800">
          Introducing, Animalize Medical Suite
        </h1>
        <p className="mt-2 text-center text-sm md:text-base leading-8 md:leading-9 text-neutral-700">
          An one-stop solution for all your veterinary needs
        </p>
        <p className="mt-6 text-blue-500 text-[16px] md:text-xl text-center font-medium leading-[1.9]">
          integrated platform → for veterinary applications
        </p>
        <div className="h-fit w-fit p-2 border rounded-2xl mx-auto mt-16">
          <img
            src="https://media.istockphoto.com/id/1411660296/photo/blood-analysis.jpg?s=612x612&w=0&k=20&c=ple-nDLXy6EPOvp_e_ex-3XQF_EGhOhrM3vOjdtWeqc="
            alt=""
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-9 mt-10 md:mt-16 text-sm md:text-sm">
          <div className="flex items-center space-x-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeWidth={1.45}>
                <rect
                  width={18.5}
                  height={18.5}
                  x={2.75}
                  y={2.75}
                  rx={6}
                ></rect>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.763 10.942v2.116a.53.53 0 0 1-.53.53h-2.645v2.645a.529.529 0 0 1-.53.53h-2.116a.53.53 0 0 1-.53-.53v-2.645H7.768a.529.529 0 0 1-.53-.53v-2.116a.529.529 0 0 1 .53-.53h2.645V7.768a.529.529 0 0 1 .53-.53h2.116a.529.529 0 0 1 .53.53v2.645h2.645a.529.529 0 0 1 .53.53"
                ></path>
              </g>
            </svg>
            <div>
              <span className="font-medium text-neutral-600">
                100+ field deployments
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="currentColor" strokeWidth={1.45}>
                <path
                  strokeLinecap="round"
                  d="M9 14.235V17a5.001 5.001 0 0 0 3 4.584m2.882.416a4.12 4.12 0 0 0 3.964-3"
                ></path>
                <path
                  strokeLinecap="round"
                  d="M12.286 3h.091c.313 0 .47 0 .601.012a3 3 0 0 1 2.725 2.724c.011.132.011.288.011.6v.9c0 .981-.202 1.916-.567 2.764M5.43 3h-.092c-.313 0-.47 0-.601.012a3 3 0 0 0-2.724 2.724C2 5.868 2 6.024 2 6.336v1.185a6.714 6.714 0 0 0 6.714 6.714a6.97 6.97 0 0 0 3-.673"
                ></path>
                <circle cx={19} cy={16} r={3}></circle>
                <path strokeLinecap="round" d="M12 2v2M6 2v2"></path>
              </g>
            </svg>
            <div>
              <span className="font-medium text-neutral-600">
                200+ pathology tests
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16"></div>
    </div>
  );
}

export default HeroSection;
