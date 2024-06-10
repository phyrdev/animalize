"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

function PermissionDenied({
  message = "You dont have necessary permissions to access this page. Please refer to your administrator.",
}) {
  const router = useRouter();
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
      <p className="text-base mt-3 leading-7 text-neutral-700">{message}</p>
      <Button
        onClick={() => {
          router.push(
            "/dashboard/issues/create?title=Permission denied&priority=low"
          );
        }}
        className="mt-4 bg-neutral-200 rounded-md"
      >
        Create an issue
      </Button>
    </div>
  );
}

export default PermissionDenied;
