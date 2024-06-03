"use client";
import Navbar from "@/components/Navbar";
import { createOrganization } from "@/prisma/organization";
import { currencies, organizationTypes } from "@/static/lists";
import {
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function SignUp() {
  const router = useRouter();

  const [organization, setOrganization] = useState({
    name: "Lenus Vet Labs",
    email: "priyangsu26@gmail.com",
    phone: "9647045453",
    zipcode: "713216",
    type: "Pathology Lab",
    size: "6-10",
    currency: "INR",
  });

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const performChecks = () => {
    let emailregex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let phoneregex = /^\d{10}$/;
    let zipregex = /^\d{6}$/;

    if (!organization.name) {
      toast.error("Organization name is required");
      return false;
    }
    if (!emailregex.test(organization.email)) {
      toast.error("Invalid email address");
      return false;
    }
    if (!phoneregex.test(organization.phone)) {
      toast.error("Invalid phone number");
      return false;
    }

    if (!zipregex.test(organization.zipcode)) {
      toast.error("Invalid zipcode");
      return false;
    }

    if (!agreed) {
      toast.error("Agree to the terms and conditions");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    if (!performChecks()) return;
    setLoading(true);
    toast.loading("Submitting application");
    let response = await createOrganization(organization);
    console.log(response);
    toast.remove();
    if (response.success) {
      toast.success(response.message);
      setSubmitted(true);
    } else {
      toast.error(response.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-svh pb-32">
      <Navbar />

      <div className="mt-7 md:mt-10 px-4">
        {submitted ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                className="text-green-500"
                viewBox="0 0 48 48"
              >
                <defs>
                  <mask id="ipSCheckOne0">
                    <g fill="none" strokeLinejoin="round" strokeWidth={4}>
                      <path
                        fill="#fff"
                        stroke="#fff"
                        d="M24 44a19.937 19.937 0 0 0 14.142-5.858A19.937 19.937 0 0 0 44 24a19.938 19.938 0 0 0-5.858-14.142A19.937 19.937 0 0 0 24 4A19.938 19.938 0 0 0 9.858 9.858A19.938 19.938 0 0 0 4 24a19.937 19.937 0 0 0 5.858 14.142A19.938 19.938 0 0 0 24 44Z"
                      ></path>
                      <path
                        stroke="#000"
                        strokeLinecap="round"
                        d="m16 24l6 6l12-12"
                      ></path>
                    </g>
                  </mask>
                </defs>
                <path
                  fill="currentColor"
                  d="M0 0h48v48H0z"
                  mask="url(#ipSCheckOne0)"
                ></path>
              </svg>
              <h1 className="text-[25px] mt-5 md:text-[30px] text-center font-semibold text-neutral-800">
                Submitted Successfully
              </h1>
              <p className="mt-2 text-center text-sm md:text-base leading-7 md:leading-9 text-neutral-500">
                Your application has been submitted successfully. We will get
                back to you soon.
              </p>

              <Link href="/">
                <Button className="mt-10 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64"
                    ></path>
                    <path
                      fill="currentColor"
                      d="m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z"
                    ></path>
                  </svg>
                  <span>Back to Home</span>
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                className="mx-auto text-blue-500"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M11 15H6l7-14v8h5l-7 14z"></path>
              </svg>
              <h1 className="text-[25px] mt-5 md:text-[30px] text-center font-semibold text-neutral-800">
                Resgister Organization
              </h1>
              <p className="mt-2 text-center text-sm md:text-base leading-7 md:leading-9 text-neutral-500">
                Register your organization to get verified and access the
                features
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 md:mt-10 max-w-4xl mx-auto px-5"
            >
              <Input
                classNames={{
                  input: "px-3",
                  label: "px-3",
                }}
                isRequired
                value={organization.name}
                radius="sm"
                onChange={(e) =>
                  setOrganization({ ...organization, name: e.target.value })
                }
                label="Organization Name"
              />
              <Input
                classNames={{
                  input: "px-3",
                  label: "px-3",
                }}
                isRequired
                value={organization.email}
                onChange={(e) =>
                  setOrganization({ ...organization, email: e.target.value })
                }
                label="Organizational email"
                radius="sm"
                onClear={() => setOrganization({ ...organization, email: "" })}
                isClearable
              />
              <Input
                classNames={{
                  input: "px-3",
                  label: "px-3",
                }}
                value={organization.phone}
                onChange={(e) =>
                  setOrganization({ ...organization, phone: e.target.value })
                }
                onClear={() => setOrganization({ ...organization, phone: "" })}
                label="Phone number"
                radius="sm"
                isRequired
                isClearable
              />
              <Input
                classNames={{
                  input: "px-3",
                  label: "px-3",
                }}
                value={organization.zipcode}
                onChange={(e) =>
                  setOrganization({ ...organization, zipcode: e.target.value })
                }
                isRequired
                label="Zipcode of the organization"
                isClearable
                radius="sm"
                onClear={() =>
                  setOrganization({ ...organization, zipcode: "" })
                }
              />
              <Select
                radius="sm"
                selectedKeys={[organization.currency]}
                onChange={(e) => {
                  setOrganization({
                    ...organization,
                    currency: e.target.value,
                  });
                }}
                classNames={{
                  innerWrapper: "px-3",
                  label: "px-3",
                }}
                label="Billing currency"
              >
                {currencies.map((currency, i) => (
                  <SelectItem key={currency.abbr}>{currency.name}</SelectItem>
                ))}
              </Select>
              <div className="md:col-span-2 pt-6">
                <RadioGroup
                  isRequired
                  label="Choose organization type"
                  orientation="horizontal"
                  value={organization.type}
                  onValueChange={(value) =>
                    setOrganization({ ...organization, type: value })
                  }
                  classNames={{
                    wrapper: "gap-8",
                    label: "pb-4 text-sm",
                  }}
                >
                  {organizationTypes.map((org, i) => (
                    <Radio
                      key={i}
                      classNames={{
                        label: "text-sm",
                      }}
                      value={org}
                    >
                      {org}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
              <div className="md:col-span-2 pt-6">
                <RadioGroup
                  isRequired
                  label="Choose employee size"
                  orientation="horizontal"
                  value={organization.size}
                  onValueChange={(value) =>
                    setOrganization({ ...organization, size: value })
                  }
                  classNames={{
                    wrapper: "gap-8",
                    label: "pb-4 text-sm",
                  }}
                >
                  <Radio
                    classNames={{
                      label: "text-sm",
                    }}
                    value="0-5"
                  >
                    0-5
                  </Radio>
                  <Radio
                    classNames={{
                      label: "text-sm",
                    }}
                    value="6-10"
                  >
                    6-10
                  </Radio>
                  <Radio
                    classNames={{
                      label: "text-sm",
                    }}
                    value="more than 10"
                  >
                    more than 10
                  </Radio>
                </RadioGroup>
              </div>
              <div className="md:col-span-2 mt-10 flex flex-wrap items-center gap-8">
                <div className="shrink-0">
                  <Checkbox
                    isSelected={agreed}
                    onValueChange={(value) => setAgreed(value)}
                  />
                  <span className="text-sm text-neutral-600">
                    I agree to the terms and conditions
                  </span>
                </div>
                <Button
                  type="submit"
                  isDisabled={loading}
                  isLoading={loading}
                  className="px-6 w-full h-12 md:w-fit bg-neutral-800 text-white ml-auto"
                  radius="full"
                >
                  <span>Apply for verification</span>
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
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp;
