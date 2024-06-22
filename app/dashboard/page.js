/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import GlobalState from "@/context/GlobalState";
import { actionslist } from "@/static/lists";
import { permissions } from "@/static/permissions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const [date, setDate] = useState("");
  const [pendingPayments, setPendingPayments] = useState([]);
  const [readyForSampleCollection, setReadyForSampleCollection] = useState([]);
  const [readyForDiagnosis, setReadyForDiagnosis] = useState([]);
  const [awaitingPathologistApproval, setAwaitingPathologistApproval] =
    useState([]);
  const [readyToDeliver, setReadyToDeliver] = useState([]);
  const [needsAttention, setNeedsAttention] = useState([]);
  const { payments, reports, issues } = useContext(GlobalState);

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

  useEffect(() => {
    if (payments.length != 0) {
      let pending = payments.filter(
        (payment) => payment.paymentStatus == "pending"
      );
      setPendingPayments(pending);
    }
  }, [payments]);

  useEffect(() => {
    if (reports.length != 0) {
      if (permissions.collectSamples.includes(session.data.user.role) == true) {
        let s200 = reports.filter((report) => report.status == "S200");
        setReadyForSampleCollection(s200);
      }
      if (permissions.feedResults.includes(session.data.user.role) == true) {
        let s201 = reports.filter((report) => report.status == "S201");
        setReadyForDiagnosis(s201);
      }
      if (permissions.reviewResults.includes(session.data.user.role) == true) {
        let s202 = reports.filter((report) => report.status == "S202");
        setAwaitingPathologistApproval(s202);
      }
      if (permissions.takeAction.includes(session.data.user.role) == true) {
        let s204 = reports.filter((report) => report.status == "S204");
        setNeedsAttention(s204);
      }
      if (permissions.createReport.includes(session.data.user.role) == true) {
        let s203 = reports.filter((report) => report.status == "S203");
        setReadyToDeliver(s203);
      }
    }
  }, [reports]);

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

          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-3">
            {pendingPayments.length != 0 && (
              <div className="p-4 bg-neutral-100 rounded">
                <h1 className="text-3xl font-semibold">
                  {pendingPayments.length}
                </h1>
                <p className="mt-2 text-neutral-700 text-sm">
                  payments are still pending
                </p>
                <button
                  onClick={() => router.push("/dashboard/payments")}
                  className="text-sm text-blue-500 mt-3 font-medium"
                >
                  Open payments
                </button>
              </div>
            )}
            {readyForSampleCollection.length != 0 && (
              <div className="p-4 bg-neutral-100 rounded">
                <h1 className="text-3xl font-semibold">
                  {readyForSampleCollection.length}
                </h1>
                <p className="mt-2 text-neutral-700 text-sm">
                  reports ready for sample collection
                </p>
                <button
                  onClick={() => router.push("/dashboard/reports")}
                  className="text-sm text-blue-500 mt-3 font-medium"
                >
                  Open reports
                </button>
              </div>
            )}
            {needsAttention.length != 0 && (
              <div className="p-4 bg-neutral-100 rounded">
                <h1 className="text-3xl font-semibold">
                  {needsAttention.length}
                </h1>
                <p className="mt-2 text-neutral-700 text-sm">
                  reports need attention
                </p>
                <button
                  onClick={() => router.push("/dashboard/reports")}
                  className="text-sm text-blue-500 mt-3 font-medium"
                >
                  Open reports
                </button>
              </div>
            )}
            {readyForDiagnosis.length != 0 && (
              <div className="p-4 bg-neutral-100 rounded">
                <h1 className="text-3xl font-semibold">
                  {readyForDiagnosis.length}
                </h1>
                <p className="mt-2 text-neutral-700 text-sm">
                  reports ready for feeding result
                </p>
                <button
                  onClick={() => router.push("/dashboard/reports")}
                  className="text-sm text-blue-500 mt-3 font-medium"
                >
                  Open reports
                </button>
              </div>
            )}
            {awaitingPathologistApproval.length != 0 && (
              <div className="p-4 bg-neutral-100 rounded">
                <h1 className="text-3xl font-semibold">
                  {awaitingPathologistApproval.length}
                </h1>
                <p className="mt-2 text-neutral-700 text-sm">
                  reports awaiting pathologist approval
                </p>
                <button
                  onClick={() => router.push("/dashboard/reports")}
                  className="text-sm text-blue-500 mt-3 font-medium"
                >
                  Open reports
                </button>
              </div>
            )}
            {readyToDeliver.length != 0 && (
              <div className="p-4 bg-neutral-100 rounded">
                <h1 className="text-3xl font-semibold">
                  {readyToDeliver.length}
                </h1>
                <p className="mt-2 text-neutral-700 text-sm">
                  reports ready for delivery
                </p>
                <button
                  onClick={() => router.push("/dashboard/reports")}
                  className="text-sm text-blue-500 mt-3 font-medium"
                >
                  Open reports
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-16">
          <span className="text-neutral-700 font-medium">Open issues</span>

          <div className="mt-6 md:mt-4 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-3">
            {issues.length != 0
              ? issues.map((issue, index) => {
                  if (issue.status == "open") {
                    return (
                      <div
                        key={index}
                        className="md:p-4 md:border border-b pb-5 md:rounded flex flex-col"
                      >
                        <h2 className="font-medium">{issue.title}</h2>
                        <p className="text-sm leading-7 md:leading-7 mt-2 text-neutral-600 line-clamp-2 mb-3">
                          {issue.description}
                        </p>
                        <div className="flex items-center justify-between mt-auto">
                          <button
                            onClick={() => router.push(`/dashboard/issues`)}
                            className="text-sm text-blue-500 font-medium"
                          >
                            Respond
                          </button>
                          <span className="text-xs">
                            {new Date(issue.createdAt).toLocaleString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                    );
                  }
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
