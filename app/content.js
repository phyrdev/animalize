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
          console.log("Connected to server");
        }
      });
    });

    client_.on("message", (topic, message) => {
      console.log("Received message", message.toString());
    });
  };

  useEffect(() => {
    if (session.status == "authenticated") {
      loadOrgData();
      reconnectMQTT();
    }
  }, [session.status]);

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
      </GlobalState.Provider>
    </>
  );
}

export default Content;
