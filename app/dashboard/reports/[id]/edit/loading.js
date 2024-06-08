import { Spinner } from "@nextui-org/react";
import React from "react";

function Loading() {
  return (
    <div className="w-full pt-16 flex items-center justify-center text-neutral-800">
      <Spinner size="md" color="current" />
    </div>
  );
}

export default Loading;
