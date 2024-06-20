"use client";
import Navbar from "@/components/Navbar";
import { validateCredentials } from "@/prisma/employee";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

function SignIn() {
  const [isVisible, setIsVisible] = useState(false);
  const [empno, setEmpno] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const performChecks = () => {
    if (empno === "") {
      toast("Employee number is required");
      return false;
    }
    if (password === "") {
      toast("Password is required");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    if (!performChecks()) return;
    setLoading(true);
    let validateReq = await validateCredentials(empno, password);
    if (validateReq.success) {
      toast.success(validateReq.message);
      toast.loading("Redirecting to dashboard...");
      await signIn("credentials", {
        empno,
        password,
      });
      toast.remove();
    } else {
      toast.error(validateReq.message);
    }
    setLoading(false);
  };

  const handleAutoSignIn = async (empno, password) => {
    if (!performChecks()) return;
    setLoading(true);
    let validateReq = await validateCredentials(empno, password);
    if (validateReq.success) {
      toast.success(validateReq.message);
      toast.loading("Redirecting to dashboard...");
      await signIn("credentials", {
        empno,
        password,
      });
      toast.remove();
    } else {
      toast.error(validateReq.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let empno = params.get("empno");
    let password = params.get("password");
    if (empno && password) {
      setEmpno(empno);
      setPassword(password);
      setTimeout(() => {
        handleAutoSignIn(empno, password);
      }, 1000);
    }
  }, []);

  return (
    <div className="min-h-svh pb-32">
      <Navbar />

      <div className="mt-7 md:mt-10 px-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={38}
          height={38}
          className="mx-auto text-blue-500"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6.5 18H13v2H6.5c-1.5 0-2.81-.5-3.89-1.57C1.54 17.38 1 16.09 1 14.58q0-1.95 1.17-3.48C3.34 9.57 4 9.43 5.25 9.15c.42-1.53 1.25-2.77 2.5-3.72S10.42 4 12 4c1.95 0 3.6.68 4.96 2.04c1.12 1.12 1.77 2.46 1.97 3.96c-.7 0-1.37.19-1.98.46a4.8 4.8 0 0 0-1.41-3C14.56 6.5 13.38 6 12 6s-2.56.5-3.54 1.46C7.5 8.44 7 9.62 7 11h-.5c-.97 0-1.79.34-2.47 1.03c-.69.68-1.03 1.5-1.03 2.47s.34 1.79 1.03 2.5c.68.66 1.5 1 2.47 1m16.5-.7v3.5c0 .6-.6 1.2-1.3 1.2h-5.5c-.6 0-1.2-.6-1.2-1.3v-3.5c0-.6.6-1.2 1.2-1.2v-1.5c0-1.4 1.4-2.5 2.8-2.5s2.8 1.1 2.8 2.5V16c.6 0 1.2.6 1.2 1.3m-2.5-2.8c0-.8-.7-1.3-1.5-1.3s-1.5.5-1.5 1.3V16h3z"
          ></path>
        </svg>
        <h1 className="text-[25px] mt-5 md:text-[30px] text-center font-semibold text-neutral-800">
          Employee sign in
        </h1>
        <p className="mt-2 text-center text-sm md:text-base leading-7 md:leading-9 text-neutral-500">
          Enter your emp. no and password to access your account
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSignIn();
          }}
          className="max-w-sm mx-auto mt-10"
        >
          <Input
            label="Employee number"
            classNames={{
              input: "px-3",
              label: "px-3",
            }}
            value={empno}
            onChange={(e) => setEmpno(e.target.value)}
            isRequired
            radius="sm"
            isClearable
            className="mt-5"
          />
          <Input
            label="Password"
            type={isVisible ? "text" : "password"}
            classNames={{
              input: "px-3",
              label: "px-3",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
            radius="sm"
            className="mt-3"
            endContent={
              <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="focus:outline-none"
              >
                {isVisible ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                    >
                      <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0"></path>
                      <path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7"></path>
                    </g>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={22}
                    height={22}
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth={1}
                    >
                      <path
                        strokeLinejoin="round"
                        d="M10.73 5.073A10.96 10.96 0 0 1 12 5c4.664 0 8.4 2.903 10 7a11.595 11.595 0 0 1-1.555 2.788M6.52 6.519C4.48 7.764 2.9 9.693 2 12c1.6 4.097 5.336 7 10 7a10.44 10.44 0 0 0 5.48-1.52m-7.6-7.6a3 3 0 1 0 4.243 4.243"
                      ></path>
                      <path d="m4 4l16 16"></path>
                    </g>
                  </svg>
                )}
              </button>
            }
          />

          <div className="flex justify-end w-full mt-4">
            <a href="#" className="text-neutral-600 text-sm mt-3 block w-fit">
              Forgot password?
            </a>
          </div>
          <Button
            type="submit"
            isDisabled={loading}
            isLoading={loading}
            className="w-full h-12 bg-neutral-800 text-white mt-5"
            radius="sm"
          >
            <span>Proceed to login</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={28}
              height={28}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z"
              ></path>
            </svg>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
