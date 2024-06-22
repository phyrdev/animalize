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

    let client_ = mqtt.connect(host);
    client_.on("connect", () => {
      client_.subscribe(`animalize/client-realtime-window`, (err) => {
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
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
            <div className="w-[400px] py-6 bg-white rounded-md flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={50}
                height={50}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm0 6c1.4 0 2.8 1.1 2.8 2.5V11c.6 0 1.2.6 1.2 1.3v3.5c0 .6-.6 1.2-1.3 1.2H9.2c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2V9.5C9.2 8.1 10.6 7 12 7m0 1.2c-.8 0-1.5.5-1.5 1.3V11h3V9.5c0-.8-.7-1.3-1.5-1.3"
                ></path>
              </svg>
              <h1 className="text-xl mt-5 font-semibold">Security step</h1>
              <p className="text-sm text-neutral-700 mt-2">
                Click the button below to prove you are human
              </p>
              <Button
                onClick={() => setHumanVerification(true)}
                className="mt-7 rounded-md w-fit px-5"
              >
                I am human
              </Button>
            </div>
          </div>
        )}
      </GlobalState.Provider>
    </>
  );
}

export default Content;
