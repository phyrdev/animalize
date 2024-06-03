/* eslint-disable @next/next/no-img-element */
"use client";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
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

function CreateReport() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isAutoFillOn, setIsAutoFillOn] = React.useState(true);

  const [pFile, setPFile] = React.useState({
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

  return (
    <div>
      <div className="px-5 md:px-10 py-5 flex items-center">
        <Breadcrumbs className="hidden md:block">
          <BreadcrumbItem>Dashboard</BreadcrumbItem>
          <BreadcrumbItem>Reports</BreadcrumbItem>
          <BreadcrumbItem>Create</BreadcrumbItem>
        </Breadcrumbs>
        <span className="text-xl font-semibold md:hidden">Create report</span>
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
            <div className="border-b pb-6 h-14 flex items-center justify-end">
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
                onChange={(e) => setPFile({ ...pFile, petSex: e.target.value })}
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
                onChange={(e) => setPFile({ ...pFile, petDob: e.target.value })}
                label="D.O.B"
                type="date"
                placeholder="1234567890"
              />
            </div>
            <div className="border-b pb-6 flex items-center justify-end gap-2 mt-6">
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
              <div className="border-b md:col-span-2 md:border w-full md:rounded flex h-20 overflow-hidden">
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
            <div className="border-b pb-6 flex items-center justify-end gap-2 mt-6">
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
            <div className="border-b pb-6 flex items-center justify-end gap-2 mt-6">
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

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 md:gap-2">
              <CustomSelect
                label="Mode"
                placeholder="Cash"
                options={paymentmodes}
              />
              <CustomSelect
                label="Status"
                placeholder="Canine"
                options={paymentstatus}
              />
              <CustomInput label="Paid amt." placeholder="0" />
            </div>
            <div className="border-b pb-6 flex items-center justify-end gap-2 mt-6">
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
                <span className="text-lg font-medium ml-3">Doctordoggy</span>
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
                    <span className="text-neutral-800">Note:</span> account pin
                    is case sensitive
                  </p>
                  <div className="mt-6">
                    <Input
                      label="Account pin"
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
                              species.value == tempPets[tempPetIndex].species
                          );
                          setPFile({
                            ...pFile,
                            petName: tempPets[tempPetIndex].name,
                            petSpecies: specie.value,
                            petBreed: tempPets[tempPetIndex].breed,
                            petDob:
                              tempPets[tempPetIndex].dateOfBirth.split("T")[0],
                            petWeight: tempPets[tempPetIndex].bodyWeight,
                          });

                          setIsAutoFillOn(false);
                          closeAllDetails();
                          document.getElementById("pet-details-dd").open = true;
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

export default CreateReport;
