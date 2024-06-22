/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import GlobalState from "@/context/GlobalState";
import { getEmployees } from "@/prisma/employee";
import { getFacilities } from "@/prisma/facility";
import { getIssues } from "@/prisma/issue";
import { getOrgPayments } from "@/prisma/payments";
import { getOrgReports } from "@/prisma/report";
import { permissions } from "@/static/permissions";
import { Button } from "@nextui-org/react";
import mqtt from "mqtt";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Content({ children }) {
  const session = useSession();
  const [reports, setReports] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [payments, setPayments] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mqttClient, setMqttClient] = useState(null);
  const [humanVerification, setHumanVerification] = useState(false);

  const refreshOrgReports = async () => {
    setLoading(true);
    let { success, data, message } = await getOrgReports(
      session.data.user.orgno
    );
    if (success) {
      setReports(data);
      refreshOrgPayments();
    } else {
      setReports([]);
    }
    setLoading(false);
  };

  const refreshOrgEmployees = async () => {
    if (permissions.manageEmployees.includes(session.data.user.role)) {
      setLoading(true);
      let { success, data, message } = await getEmployees(
        session.data.user.orgno
      );
      if (success) {
        setEmployees(data);
      } else {
        toast.error(message);
      }
      setLoading(false);
    }
  };

  const refreshOrgFacilities = async () => {
    if (permissions.manageFacilities.includes(session.data.user.role)) {
      setLoading(true);
      let { success, data, message } = await getFacilities(
        session.data.user.orgno
      );
      if (success) {
        setFacilities(data);
      }
      setLoading(false);
    }
  };

  const refreshOrgPayments = async () => {
    if (permissions.managePayments.includes(session.data.user.role)) {
      setLoading(true);
      let { success, data, message } = await getOrgPayments(
        session.data.user.orgno
      );

      if (success) {
        setPayments(data);
      }

      setLoading(false);
    }
  };

  const refreshOrgIssues = async () => {
    if (permissions.manageIssues.includes(session.data.user.role)) {
      setLoading(true);
      let { success, data, message } = await getIssues(session.data.user.orgno);
      if (success) {
        setIssues(data);
      }
      setLoading(false);
    }
  };

  const loadOrgData = async () => {
    await refreshOrgReports();
    await refreshOrgEmployees();
    await refreshOrgFacilities();
    await refreshOrgPayments();
    await refreshOrgIssues();
  };

  const reconnectMQTT = () => {
    if (mqttClient) {
      console.log("Already connected to MQTT broker");
      return;
    }

    let host =
      process.env.NODE_ENV === "development"
        ? "wss://test.mosquitto.org:8081"
        : "wss://test.mosquitto.org:8081";

    let topic = `animalize/client-realtime-window/${session.data.user.orgno}`;
    console.log("Connecting to MQTT broker", host, topic);

    let client_ = mqtt.connect(host);
    client_.on("connect", () => {
      client_.subscribe(topic, (err) => {
        if (!err) {
          setMqttClient(client_);
          toast.success("Connected to server");
          //   document.getElementById("audio").muted = false;
          //   document.getElementById("audio").play();
        }
      });
    });

    client_.on("message", (topic, message) => {
      console.log("Received message", message.toString());
      toast.success(message.toString());
      document.getElementById("audio").muted = false;
      document.getElementById("audio").play();
    });
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      loadOrgData();
      humanVerification && reconnectMQTT();
    }
  }, [session.status, humanVerification]);

  useEffect(() => {
    if (mqttClient) {
      console.log("MQTT client connected");
    }
  }, [mqttClient]);

  return (
    <>
      <GlobalState.Provider
        value={{
          reports,
          setReports,
          refreshOrgReports,
          employees,
          setEmployees,
          refreshOrgEmployees,
          facilities,
          setFacilities,
          refreshOrgFacilities,
          payments,
          setPayments,
          refreshOrgPayments,
          issues,
          setIssues,
          refreshOrgIssues,
          loading,
        }}
      >
        {children}
        <audio id="audio" src="../static/notification.wav" muted></audio>
        {humanVerification == false && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="w-[400px] pb-8 overflow-hidden bg-white rounded-md flex flex-col items-center justify-center">
              <img
                src="https://media.licdn.com/dms/image/D5612AQGk7OqF9lpr0Q/article-cover_image-shrink_720_1280/0/1674955047440?e=2147483647&v=beta&t=8n3UXlK2A_cIwvoeVfj1TqmixM4q3_WXsQPWVQqbiek"
                alt=""
              />

              <h1 className="text-2xl mt-6 font-semibold">
                Mood <span className="opacity-50">board</span>
              </h1>
              <p className="text-sm text-neutral-600 mt-2">
                how are you feeling at work today?
              </p>

              <div className="grid grid-cols-3 mt-6 gap-2 w-fit">
                <Button
                  onClick={() => setHumanVerification(true)}
                  className="rounded-md bg-neutral-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      color="currentColor"
                    >
                      <circle cx={12} cy={12} r={10}></circle>
                      <path d="M8 15a5 5 0 0 0 4 2a5 5 0 0 0 4-2m-1-7s-1 1-1 2c.75-1 2.25-1 3 0M9 8s1 1 1 2c-.75-1-2.25-1-3 0"></path>
                    </g>
                  </svg>
                  Happy
                </Button>
                <Button
                  onClick={() => setHumanVerification(true)}
                  className="rounded-md bg-neutral-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      color="currentColor"
                    >
                      <circle cx={12} cy={12} r={10}></circle>
                      <path d="M8.009 9H8m8 0h-.009M9 16h6"></path>
                    </g>
                  </svg>
                  Neutral
                </Button>
                <Button
                  onClick={() => setHumanVerification(true)}
                  className="rounded-md bg-neutral-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 14 14"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4.75 5.5a.25.25 0 0 1 0-.5m0 .5a.25.25 0 0 0 0-.5m4.5.5a.25.25 0 0 1 0-.5m0 .5a.25.25 0 0 0 0-.5"></path>
                      <path d="M7 13.5a6.5 6.5 0 1 0 0-13a6.5 6.5 0 0 0 0 13"></path>
                      <path d="M4 10c.448-1.428 2.15-2.3 3.85-1.904A3.07 3.07 0 0 1 10 10"></path>
                    </g>
                  </svg>
                  Sad
                </Button>
              </div>
            </div>
          </div>
        )}
      </GlobalState.Provider>
    </>
  );
}

export default Content;
