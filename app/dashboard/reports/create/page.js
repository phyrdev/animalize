/* eslint-disable @next/next/no-img-element */
"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Checkbox,
  Input,
  Textarea,
} from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";
import { DateInput } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";
import { RadioGroup, Radio } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import CustomInput from "../../components/CustomInput";
import CustomSelect from "../../components/CustomSelect";
import CustomList from "../../components/CustomList";
import {
  paymentmodes,
  paymentstatus,
  petbreeds,
  petsex,
  petspecies,
} from "@/static/lists";
import toast from "react-hot-toast";
import axios from "axios";
import { useSession } from "next-auth/react";
import { permissions } from "@/static/permissions";

function CreateReport() {
  const session = useSession();
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isAutoFillOn, setIsAutoFillOn] = React.useState(false);

  const [pFile, setPFile] = React.useState({
    empno: "",
    orgno: "",
    accPin: "",
    petName: "",
    petSpecies: "",
    petBreed: "",
    petSex: "",
    petWeight: "",
    petDob: "",
    parentFirstName: "",
    parentLastName: "",
    parentEmail: "",
    parentPhone: "",
    parentZipcode: "",
    parentAddress: "",
    tests: [],
    subtotal: 0,
    paymentMode: "",
    paymentStatus: "",
    paidAmount: "",
    contentDeclaration: false,
    createDoctordoggyAccount: false,
    additionalNotes: "",
  });

  const [tempPets, setTempPets] = React.useState([]);
  const [tempPetIndex, setTempPetIndex] = React.useState(null);

  const closeAllDetails = () => {
    document.getElementById("auto-fill-dd").open = false;
    document.getElementById("pet-details-dd").open = false;
    document.getElementById("parent-details-dd").open = false;
    document.getElementById("test-details-dd").open = false;
    document.getElementById("billing-details-dd").open = false;
  };

  const searchPets = async (e) => {
    if (pFile.accPin.trim().length == 0) {
      return toast.error("Please enter a valid account pin");
    }
    let url = "https://www.doctordoggy.vet/api/public/pets/get-pets-by-ac-pin";
    toast.loading("Searching pets...");
    let response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": "Bearer iladunwo84ikchw9dfhwojc",
        "x-account-id": pFile.accPin.toString().trim(),
      },
    });
    toast.remove();

    if (response.data.success) {
      setTempPets(response.data.user.pets);
      setPFile({
        ...pFile,
        parentFirstName: response.data.user.name.split(" ")[0],
        parentLastName: response.data.user.name.split(" ")[1],
        parentEmail: response.data.user.email,
        parentPhone: response.data.user.phone,
        parentZipcode: response.data.user.zipCode,
      });
    }
  };

  if (session.status == "authenticated") {
    if (permissions.createReport.includes(session.data.user.role) == false) {
      return (
        <div className="p-5 md:p-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={32}
            height={32}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M18.5 11.25c-1.272 0-2.372.89-2.636 2.135l-.022.104a2.84 2.84 0 0 0-.036.973l.153 1.112l-.17.022a1.765 1.765 0 0 0-1.539 1.75v2.307c0 .888.658 1.637 1.538 1.751c1.8.234 3.624.234 5.424 0a1.765 1.765 0 0 0 1.538-1.75v-2.307c0-.888-.658-1.637-1.538-1.751a19.559 19.559 0 0 0-.171-.022l.153-1.112a2.828 2.828 0 0 0-.036-.973l-.022-.104A2.695 2.695 0 0 0 18.5 11.25m1.044 4.196l.164-1.189c.02-.152.015-.306-.017-.456l-.022-.104a1.195 1.195 0 0 0-2.338 0l-.022.104c-.032.15-.037.304-.017.456l.164 1.19a21.077 21.077 0 0 1 2.088 0m-3.563 1.637a19.564 19.564 0 0 1 5.038 0c.132.018.231.13.231.264v2.306a.265.265 0 0 1-.231.264a19.555 19.555 0 0 1-5.038 0a.265.265 0 0 1-.231-.264v-2.306c0-.134.099-.246.231-.264"
              clipRule="evenodd"
            ></path>
            <path
              fill="currentColor"
              d="M12.75 18.365a.301.301 0 0 0-.303-.3a71.146 71.146 0 0 1-5.527-.18l-1.514-.109a1.128 1.128 0 0 1-1.03-.922a22.73 22.73 0 0 1-.208-6.796l.273-2.27A1.18 1.18 0 0 1 5.61 6.75h2.292c.44 0 .797.357.797.797c0 .585.474 1.06 1.06 1.06h8.712c.57 0 1.054.413 1.144.975l.013.083a.425.425 0 0 0 .282.329c.351.125.682.297.985.508c.15.105.372-.013.347-.195a22.126 22.126 0 0 0-.082-.56l-.064-.402a2.658 2.658 0 0 0-2.625-2.239h-8.314A2.298 2.298 0 0 0 7.903 5.25H5.612a2.68 2.68 0 0 0-2.66 2.36l-.273 2.27a24.23 24.23 0 0 0 .222 7.243a2.629 2.629 0 0 0 2.398 2.15l1.514.108c1.877.134 3.759.195 5.64.184a.299.299 0 0 0 .297-.3z"
            ></path>
          </svg>
          <h2 className="text-xl font-semibold mt-4">Forbidden</h2>
          <p className="text-base mt-3 leading-7 text-neutral-700">
            You dont have necessary permissions to access this page. Please
            refer to your administrator.
          </p>
          <Button className="mt-4 bg-neutral-200 rounded-md">
            Create an issue
          </Button>
        </div>
      );
    } else {
      return (
        <div>
          <div className="px-5 md:px-10 py-5 flex items-center">
            <Breadcrumbs className="hidden md:block">
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
              <BreadcrumbItem>Reports</BreadcrumbItem>
              <BreadcrumbItem>Create</BreadcrumbItem>
            </Breadcrumbs>
            <span className="text-xl font-semibold md:hidden">
              Create report
            </span>
            <Button isIconOnly className="ml-auto rounded-md bg-neutral-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M17 9a8 8 0 1 0-6.278 7.814a6 6 0 0 1-.388-.94a7 7 0 1 1 5.64-7.474l.032.03q.3.313.597.537q.197.149.394.263Q17 9.115 17 9M9.049 5a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5M9 7.5a.5.5 0 0 1 .492.41L9.5 8v4.502a.5.5 0 0 1-.992.09l-.008-.09V8a.5.5 0 0 1 .5-.5m8 2.847a4.6 4.6 0 0 1-1-.583a6 6 0 0 1-.716-.642a.39.39 0 0 0-.566 0c-.995 1.036-2.095 1.545-3.318 1.545c-.22 0-.4.186-.4.416v2.501l.004.266q.04 1.196.44 2.15A4.8 4.8 0 0 0 13 18q.787.6 1.874.979a.4.4 0 0 0 .254 0c2.56-.89 3.873-2.713 3.873-5.395v-2.5l-.008-.085a.405.405 0 0 0-.392-.332q-.304 0-.6-.043a4 4 0 0 1-1-.277"
                />
              </svg>
            </Button>

            <Link href="/dashboard/reports/create">
              <Button className="ml-3 w-fit md:px-6 md:ml-5 h-10 rounded-md bg-neutral-800 text-white">
                Save report
              </Button>
            </Link>
          </div>

          <div className="md:px-10 px-5 mt-5 max-w-4xl">
            <details id="auto-fill-dd">
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Is the pet registered in doctordoggy ?
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <RadioGroup
                  label="Select an appropriate option"
                  orientation="horizontal"
                  value={isRegistered}
                  onValueChange={setIsRegistered}
                  classNames={{
                    wrapper: "flex flex-wrap gap-6",
                    label: "pb-2 text-sm",
                  }}
                >
                  <Radio value={true}>Yes</Radio>
                  <Radio value={false}>No</Radio>
                </RadioGroup>
                <div className="pb-6 h-14 flex items-center justify-end">
                  <Button
                    onClick={() => {
                      closeAllDetails();
                      if (isRegistered) {
                        setIsAutoFillOn(true);
                      } else {
                        document.getElementById("pet-details-dd").open = true;
                      }
                    }}
                    className="rounded"
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </details>
            <details id="pet-details-dd" className="mt-8">
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Pet details
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
                  <CustomInput
                    value={pFile.petName}
                    onChange={(e) =>
                      setPFile({ ...pFile, petName: e.target.value })
                    }
                    label="Pet name"
                    placeholder="Roxy"
                  />
                  <CustomSelect
                    label="Species"
                    value={pFile.petSpecies}
                    onChange={(e) =>
                      setPFile({ ...pFile, petSpecies: e.target.value })
                    }
                    placeholder="Canine"
                    options={petspecies}
                  />
                  <CustomList
                    label="Breed"
                    value={pFile.petBreed}
                    onChange={(e) =>
                      setPFile({ ...pFile, petBreed: e.target.value })
                    }
                    placeholder="Breed name"
                    options={petbreeds}
                  />

                  <CustomSelect
                    placeholder="Male intact"
                    label="Sex"
                    value={pFile.petSex}
                    onChange={(e) =>
                      setPFile({ ...pFile, petSex: e.target.value })
                    }
                    options={petsex}
                  />
                  <CustomInput
                    label="Weight"
                    endContent={
                      <span className="text-neutral-500 text-sm">Kg</span>
                    }
                    value={pFile.petWeight}
                    onChange={(e) =>
                      setPFile({ ...pFile, petWeight: e.target.value })
                    }
                    placeholder="24"
                  />
                  <CustomInput
                    value={pFile.petDob}
                    onChange={(e) =>
                      setPFile({ ...pFile, petDob: e.target.value })
                    }
                    label="D.O.B"
                    type="date"
                    placeholder="1234567890"
                  />
                </div>
                <div className="pb-6 flex items-center justify-end gap-2 mt-6">
                  <Button
                    onClick={() => {
                      closeAllDetails();
                      document.getElementById("auto-fill-dd").open = true;
                    }}
                    className="rounded bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      closeAllDetails();
                      document.getElementById("parent-details-dd").open = true;
                    }}
                    className="rounded"
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </details>
            <details id="parent-details-dd" className="mt-8">
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Parent details
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
                  <CustomInput
                    value={pFile.parentFirstName}
                    onChange={(e) =>
                      setPFile({ ...pFile, parentFirstName: e.target.value })
                    }
                    label="First name"
                    placeholder="John"
                  />
                  <CustomInput
                    value={pFile.parentLastName}
                    onChange={(e) =>
                      setPFile({ ...pFile, parentLastName: e.target.value })
                    }
                    label="Last name"
                    placeholder="Doe"
                  />
                  <CustomInput
                    value={pFile.parentEmail}
                    onChange={(e) =>
                      setPFile({ ...pFile, parentEmail: e.target.value })
                    }
                    label="Email"
                    placeholder="abc@gmai.com"
                  />
                  <CustomInput
                    value={pFile.parentPhone}
                    onChange={(e) =>
                      setPFile({ ...pFile, parentPhone: e.target.value })
                    }
                    label="Phone no."
                    placeholder="1234567890"
                  />
                  <CustomInput
                    value={pFile.parentZipcode}
                    onChange={(e) =>
                      setPFile({ ...pFile, parentZipcode: e.target.value })
                    }
                    label="Zipcode"
                    placeholder="713216"
                  />
                  <div className="md:col-span-2 md:border w-full md:rounded flex h-20 overflow-hidden">
                    <span className="h-full w-24 px-3 border-r bg-neutral-50 flex py-3 text-sm text-neutral-500 shrink-0">
                      Address
                    </span>
                    <textarea
                      className="w-full h-full resize-none p-3 outline-none"
                      placeholder="Residential address"
                      value={pFile.parentAddress}
                      onChange={(e) =>
                        setPFile({ ...pFile, parentAddress: e.target.value })
                      }
                      name=""
                      id=""
                    ></textarea>
                  </div>
                </div>
                <div className="pb-6 flex items-center justify-end gap-2 mt-6">
                  <Button
                    onClick={() => {
                      closeAllDetails();
                      document.getElementById("pet-details-dd").open = true;
                    }}
                    className="rounded bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      closeAllDetails();
                      document.getElementById("test-details-dd").open = true;
                    }}
                    className="rounded"
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </details>
            <details id="test-details-dd" className="mt-8">
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Choose tests to be done
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <Button className="bg-white border">
                  <span>Choose tests</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 1024 1024"
                  >
                    <path
                      fill="currentColor"
                      d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z"
                    />
                  </svg>
                </Button>
                <div className="pb-6 flex items-center justify-end gap-2 mt-6">
                  <Button
                    onClick={() => {
                      document.getElementById("auto-fill-dd").open = false;
                    }}
                    className="rounded bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      document.getElementById("auto-fill-dd").open = false;
                    }}
                    className="rounded"
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </details>
            <details id="billing-details-dd" className="mt-8">
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Billing details
                </div>
              </summary>
              <div className="pt-5 md:pl-5">
                <div className="w-full flex flex-wrap gap-3 md:gap-6">
                  <div className="text-sm">
                    <span className="text-neutral-500">Patient name:</span>{" "}
                    <span>Roxy</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-neutral-500">Parent name:</span>{" "}
                    <span>Priyangsu Banerjee</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-neutral-500">Tests to be done:</span>{" "}
                    <span>CBC, LFT</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center bg-neutral-50 border-y px-5 py-2 text-sm font-medium text-neutral-500">
                    <span className="w-16">S.no</span>
                    <span className="ml-3">Test name</span>
                    <span className="ml-auto">Price</span>
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center px-5">
                      <span className="w-16">1</span>
                      <span className="ml-3 text-sm">C.B.C</span>
                      <span className="ml-auto">₹2500</span>
                    </div>
                    <div className="flex items-center px-5">
                      <span className="w-16">2</span>
                      <span className="ml-3 text-sm">C.B.C</span>
                      <span className="ml-auto">₹2500</span>
                    </div>
                  </div>
                  <div className="flex items-center border-t px-5 py-2 font-medium mt-4">
                    <span className="text-base text-black">Subtotal</span>
                    <span className="ml-auto">₹5000</span>
                  </div>
                </div>

                <p className="mt-12 text-base font-medium">Record payment</p>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-2 md:gap-2 border-t md:border-none">
                  <CustomSelect
                    label="Mode"
                    placeholder="Cash"
                    value={pFile.paymentMode}
                    onChange={(e) =>
                      setPFile({ ...pFile, paymentMode: e.target.value })
                    }
                    options={paymentmodes}
                  />
                  <CustomSelect
                    label="Status"
                    placeholder="Canine"
                    value={pFile.paymentStatus}
                    onChange={(e) =>
                      setPFile({ ...pFile, paymentStatus: e.target.value })
                    }
                    options={paymentstatus}
                  />
                  <CustomInput
                    label="Paid amt."
                    placeholder="0"
                    endContent={
                      <span className="text-neutral-500 text-sm">₹</span>
                    }
                    value={pFile.paidAmount}
                    onChange={(e) =>
                      setPFile({ ...pFile, paidAmount: e.target.value })
                    }
                  />
                </div>

                {pFile.paymentStatus == "pending" && (
                  <span className="text-sm mt-6 inline-block">
                    Due amount : ₹{5000 - pFile.paidAmount}
                  </span>
                )}

                <div className="pb-6 flex items-center justify-end gap-2 mt-6">
                  <Button
                    onClick={() => {
                      document.getElementById("auto-fill-dd").open = false;
                    }}
                    className="rounded bg-transparent"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => {
                      document.getElementById("auto-fill-dd").open = false;
                    }}
                    className="rounded"
                  >
                    Proceed
                  </Button>
                </div>
              </div>
            </details>
            <details id="billing-details-dd" className="mt-8">
              <summary>
                <div className="inline-flex pl-2 font-medium text-base cursor-pointer select-none">
                  Declaration
                </div>
              </summary>
              <div className="pt-5 md:pl-5 space-y-3 md:space-y-4">
                <div className="flex items-start space-x-1">
                  <Checkbox className="text-sm"></Checkbox>
                  <p className="text-sm leading-6 -mt-[5px] md:-mt-[2px] text-neutral-600">
                    I hereby declare that the above information is true to the
                    best of my knowledge
                  </p>
                </div>
                <div className="flex items-start space-x-1">
                  <Checkbox className="text-sm"></Checkbox>
                  <p className="text-sm leading-6 -mt-[5px] md:-mt-[2px] text-neutral-600">
                    Create a doctordoggy account for the pet parent
                  </p>
                </div>
                <div className="pt-7">
                  <p className="text-sm text-neutral-600">Additional notes</p>
                  <textarea
                    value={pFile.additionalNotes}
                    onChange={(e) =>
                      setPFile({ ...pFile, additionalNotes: e.target.value })
                    }
                    className="w-full h-24 resize-y p-3 outline-none border rounded-md mt-3"
                    placeholder="Some additional notes"
                  ></textarea>
                </div>
              </div>
            </details>
          </div>

          <>
            {isAutoFillOn && (
              <div className="fixed inset-0 h-full w-full bg-black/50 z-20 flex items-end md:items-center justify-center">
                <div className="bg-white md:rounded-lg p-5 min-h-[50%] h-fit md:min-h-fit md:h-fit w-full md:w-[450px]">
                  <div className="flex items-center">
                    <img
                      src="https://www.doctordoggy.vet/logoDark.png"
                      alt=""
                      className="h-8"
                    />
                    <span className="text-lg font-medium ml-3">
                      Doctordoggy
                    </span>
                    <button
                      onClick={() => {
                        setIsAutoFillOn(false);
                      }}
                      className="ml-auto text-neutral-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="1.55"
                          d="M18 6L6 18M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  {tempPets.length == 0 ? (
                    <>
                      <p className="mt-6 leading-7 text-neutral-600">
                        Please provide the doctor doggy account pin of the pet
                        parent to proceed
                      </p>
                      <p className="text-sm text-neutral-500 mt-4">
                        <span className="text-neutral-800">Note:</span> account
                        pin is case sensitive
                      </p>
                      <div className="mt-6">
                        <Input
                          label="Account pin"
                          classNames={{
                            label: "pl-2",
                            input: "pl-2",
                          }}
                          radius="sm"
                          value={pFile.accPin}
                          onChange={(e) =>
                            setPFile({ ...pFile, accPin: e.target.value })
                          }
                        />
                        <div className="flex items-center justify-end mt-8">
                          <Button
                            onClick={searchPets}
                            isDisabled={pFile.accPin.length == 0}
                            className="rounded bg-neutral-900 text-white disabled:opacity-50"
                          >
                            Proceed
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="mt-6 leading-7 text-neutral-600">
                        Select the pet from the list below
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-6">
                        {tempPets.map((pet, index) => (
                          <div
                            style={{
                              background:
                                tempPetIndex == index ? "rgb(229 229 229)" : "",
                            }}
                            key={index}
                            onClick={() => {
                              setTempPetIndex(index);
                            }}
                            className="rounded-md hover:bg-neutral-100 py-5 px-2 flex flex-col items-center justify-center cursor-pointer"
                          >
                            <img
                              src={pet.image}
                              className="h-14 w-14 rounded-full object-cover"
                              alt=""
                            />
                            <p className="text-base mt-3 font-semibold text-center">
                              {pet.name}
                            </p>
                            <p className="text-sm text-center mt-2 line-clamp-1 text-neutral-700">
                              {pet.breed}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-12">
                        <div className="flex items-center justify-end gap-3">
                          <Button
                            onClick={() => {
                              setTempPets([]);
                              setTempPetIndex(null);
                            }}
                            className="rounded bg-neutral-200 text-black disabled:opacity-50"
                          >
                            Try again
                          </Button>
                          <Button
                            onClick={() => {
                              if (tempPetIndex == null)
                                return toast.error(
                                  "Please select a pet to proceed"
                                );
                              let specie = petspecies.find(
                                (species) =>
                                  species.value ==
                                  tempPets[tempPetIndex].species
                              );
                              setPFile({
                                ...pFile,
                                petName: tempPets[tempPetIndex].name,
                                petSpecies: specie.value,
                                petBreed: tempPets[tempPetIndex].breed,
                                petDob:
                                  tempPets[tempPetIndex].dateOfBirth.split(
                                    "T"
                                  )[0],
                                petWeight: tempPets[tempPetIndex].bodyWeight,
                              });

                              setIsAutoFillOn(false);
                              closeAllDetails();
                              document.getElementById(
                                "pet-details-dd"
                              ).open = true;
                            }}
                            isDisabled={setTempPetIndex == null}
                            className="rounded bg-neutral-900 text-white disabled:opacity-50"
                          >
                            Fill details
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        </div>
      );
    }
  }
}

export default CreateReport;
