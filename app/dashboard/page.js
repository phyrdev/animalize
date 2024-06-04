"use client";
import { actionslist } from "@/static/lists";
import { Button } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const session = useSession();
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

  if (session.status == "authenticated") {
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
            {actionslist.map((action, index) => {
              if (action.access.includes(session.data.user.role) == false)
                return;
              return (
                <Link href={action.url} key={index}>
                  <button className="px-3 py-2 bg-neutral-100 rounded hover:bg-neutral-200">
                    {action.label}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="mt-16">
          <span className="text-neutral-700 font-medium">
            Personal suggestions
          </span>

          <div className="mt-4 flex flex-wrap gap-3">
            <div className="p-4 bg-neutral-100 rounded">
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

          <div className="mt-6 md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-3">
            <div className="md:p-4 md:border border-b pb-5 md:rounded">
              <h2 className="font-medium">Issue title</h2>
              <p className="text-sm leading-7 md:leading-7 mt-2 text-neutral-600">
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
            <div className="md:p-4 md:border border-b last:border-b-0 md:last:border pb-5 md:rounded">
              <h2 className="font-medium">Issue title</h2>
              <p className="text-sm leading-7 md:leading-7 mt-2 text-neutral-600">
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
}

export default Dashboard;
