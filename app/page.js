/* eslint-disable @next/next/no-img-element */
import HeroSection from "@/components/Fragments/HeroSection";
import Navbar from "@/components/Navbar";
import { Button } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
    </div>
  );
}
