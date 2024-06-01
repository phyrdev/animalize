"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React from "react";

function Dashboard() {
  return (
    <div>
      Dashboard
      <Button onClick={() => signOut()}>Sign Out</Button>
    </div>
  );
}

export default Dashboard;
