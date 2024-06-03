import React from "react";

function CustomInput({ label = "Name", placeholder, type = "text" }) {
  return (
    <div className="h-12 border-b md:border md:rounded overflow-hidden flex items-center">
      <span className="h-full w-24 px-3 border-r bg-neutral-50 flex items-center text-sm text-neutral-500 shrink-0">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="h-full w-full px-3 outline-none"
      />
    </div>
  );
}

export default CustomInput;
