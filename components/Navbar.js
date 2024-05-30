/* eslint-disable @next/next/no-img-element */
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between mx-auto w-full max-w-[88%] h-20">
      <Link href={"/"}>
        <img src="/explogo.svg" className="h-6" alt="" />
      </Link>
      <ul className="hidden md:flex items-center text-sm space-x-9 text-neutral-800 bg-gray-100 px-8 py-2 rounded-full">
        <li>About</li>
        <li>Features</li>
        <li>Find centre</li>
        <li>Contact us</li>
      </ul>
      <div className="flex items-center md:space-x-3">
        <Link href="/signup">
          <Button
            radius="full"
            className="px-6 md:bg-transparent bg-neutral-100 text-sm"
          >
            Sign up
          </Button>
        </Link>
        <Button
          radius="full"
          className="px-6 text-white bg-blue-500 text-sm hidden md:block"
        >
          Sign in
        </Button>
      </div>
    </nav>
  );
}

export default Navbar;
