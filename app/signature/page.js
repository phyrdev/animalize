"use client";
import React, { useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

function Page() {
  const ref = useRef();
  return (
    <div>
      <div className="border w-fit h-fit">
        <ReactSignatureCanvas
          ref={ref}
          penColor="black"
          dotSize={1}
          velocityFilterWeight={1}
          minWidth={1}
          maxWidth={2}
          backgroundColor="white"
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        />
      </div>

      <button
        onClick={() => {
          ref.current.clear();
        }}
      >
        Clear
      </button>
    </div>
  );
}

export default Page;
