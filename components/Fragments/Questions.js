"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

function Questions() {
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
  return (
    <div className="max-w-6xl mx-auto text-center mt-44 pb-24 px-5">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          className="mx-auto text-blue-500"
          viewBox="0 0 256 256"
        >
          <path
            fill="currentColor"
            d="M232 74h-72a38 38 0 0 0-32 17.55A38 38 0 0 0 96 74H24a6 6 0 0 0-6 6v120a6 6 0 0 0 6 6h72a26 26 0 0 1 26 26a6 6 0 0 0 12 0a26 26 0 0 1 26-26h72a6 6 0 0 0 6-6V80a6 6 0 0 0-6-6M96 194H30V86h66a26 26 0 0 1 26 26v92.31A37.86 37.86 0 0 0 96 194m130 0h-66a37.83 37.83 0 0 0-26 10.33V112a26 26 0 0 1 26-26h66ZM91.2 44.4a46 46 0 0 1 73.6 0a6 6 0 1 1-9.6 7.2a34 34 0 0 0-54.4 0a6 6 0 1 1-9.6-7.2"
          ></path>
        </svg>
        <h1 className="text-[23px] md:text-[28px] mt-6 lg:text-[25px] font-semibold  text-center leading-[1.4]">
          Frequently Asked Questions
        </h1>
        <p className="mt-1 text-neutral-600 md:leading-9 leading-7 text-sm md:text-base">
          Here are some of the benefits of using our platform.
        </p>
        <div className="max-w-2xl mx-auto mt-10 text-left">
          <Accordion showDivider={false} defaultExpandedKeys={["1"]}>
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="This is a great question."
            >
              <p className="text-neutral-600 leading-8 lg:leading-8 text-sm lg:text-sm bg-neutral-100 p-4 rounded-lg">
                {defaultContent}
              </p>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Question 2">
              <p className="text-neutral-600 leading-8 text-sm lg:text-base bg-neutral-100 p-4 rounded-lg">
                {defaultContent}
              </p>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Question 3">
              <p className="text-neutral-600 leading-8 text-base bg-neutral-100 p-4 rounded-lg">
                {defaultContent}
              </p>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default Questions;
