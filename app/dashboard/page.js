"use client";
import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
  }, []);
  return (
    <div className="p-5 md:p-10">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-semibold">Home</span>
        <span className="text-sm text-neutral-400">|</span>
        <span className="text-sm text-neutral-600">{date.toString()}</span>
      </div>
      <div className="mt-10">
        <span className="text-neutral-700 font-medium">Actions</span>

        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Create fresh report
          </button>
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Add new facility
          </button>
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Collect samples
          </button>
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Manage employees
          </button>
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Manage facilities
          </button>
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Manage payments
          </button>
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Capture data from sensor
          </button>
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Report an issue
          </button>
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Flag a report
          </button>
          <button className="bg-neutral-100 px-4 py-2 rounded-sm">
            Generate payment report
          </button>
        </div>
      </div>
      <div className="mt-16">
        <span className="text-neutral-700 font-medium">
          Personal suggestions
        </span>

        <div className="mt-4 flex flex-wrap gap-3">
          <div className="p-4 bg-neutral-100">
            <h1 className="text-3xl font-semibold">2</h1>
            <p className="mt-2 text-neutral-700 text-sm">
              payments are still pending
            </p>
            <button className="text-sm text-blue-500 mt-3 font-medium">
              Open payments
            </button>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <span className="text-neutral-700 font-medium">Open issues</span>

        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="p-4 border">
            <h2 className="font-medium">Issue title</h2>
            <p className="text-sm leading-6 mt-2 text-neutral-600">
              This is a demo issue. You can create a new issue by clicking the
              button below.
            </p>
            <div className="flex items-center justify-between mt-3">
              <button className="text-sm text-blue-500 font-medium">
                Respond
              </button>
              <span className="text-xs">2 June, 2024</span>
            </div>
          </div>
          <div className="p-4 border">
            <h2 className="font-medium">Issue title</h2>
            <p className="text-sm leading-6 mt-2 text-neutral-600">
              This is a demo issue. You can create a new issue by clicking the
              button below.
            </p>
            <div className="flex items-center justify-between mt-3">
              <button className="text-sm text-blue-500 font-medium">
                Respond
              </button>
              <span className="text-xs">2 June, 2024</span>
            </div>
          </div>
          <div className="p-4 border">
            <h2 className="font-medium">Issue title</h2>
            <p className="text-sm leading-6 mt-2 text-neutral-600">
              This is a demo issue. You can create a new issue by clicking the
              button below.
            </p>
            <div className="flex items-center justify-between mt-3">
              <button className="text-sm text-blue-500 font-medium">
                Respond
              </button>
              <span className="text-xs">2 June, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
