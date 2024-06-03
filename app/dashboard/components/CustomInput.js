import React from "react";

function CustomInput({
  label = "Name",
  placeholder,
  type = "text",
  endContent = null,
}) {
  return (
    <div className="h-12 border-b md:border md:rounded overflow-hidden flex items-center relative">
      <span className="h-full w-24 px-3 border-r bg-neutral-50 flex items-center text-sm text-neutral-500 shrink-0">
        {label}
      </span>
      <div className="absolute right-3">{endContent}</div>
      <input
        type={type}
        defaultValue={type == "date" ? "2021-08-01" : ""}
        placeholder={placeholder}
        style={{
          width: type == "date" ? "fit-content" : "100%",
        }}
        className="h-full w-full px-3 outline-none bg-transparent"
      />
    </div>
  );
}

export default CustomInput;
