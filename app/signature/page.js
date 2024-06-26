"use client";
import { uploadImage } from "@/helper/image";
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
          velocityFilterWeight={0.1}
          backgroundColor="white"
          canvasProps={{ width: 500, height: 300, className: "sigCanvas" }}
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
        onClick={async () => {
          const img = ref.current.getTrimmedCanvas().toDataURL("image/png");
          // convert to file & append to form
          const file = new File([img], "signature.png", {
            type: "image/png",
          });
          let data = await uploadImage(file);
          console.log(data);
        }}
      >
        Convert to Image
      </button>
    </div>
  );
}

export default Page;
