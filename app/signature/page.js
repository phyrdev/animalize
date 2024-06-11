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
      <button
        onClick={() => {
          const img = ref.current.getTrimmedCanvas().toDataURL("image/png");
          // convert to file & append to form
          const file = new File([img], "signature.png", {
            type: "image/png",
          });
          const formData = new FormData();
          formData.append("signature", file);
        }}
      >
        Convert to Image
      </button>
    </div>
  );
}

export default Page;
