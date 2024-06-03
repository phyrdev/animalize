import React from "react";

function CustomSelect({
  label = "Species",
  placeholder,
  options = [],
  value = "",
  onChange = () => {},
}) {
  return (
    <div className="h-12 border-b md:border md:rounded overflow-hidden flex items-center relative">
      <span className="h-full w-24 px-3 border-r bg-neutral-50 flex items-center text-sm text-neutral-500 shrink-0">
        {label}
      </span>
      <button className="absolute right-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="4"
            d="M36 18L24 30L12 18"
          />
        </svg>
      </button>
      <select
        name=""
        id=""
        value={value}
        onChange={onChange}
        className="w-full h-full appearance-none bg-transparent px-3 outline-none relative cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CustomSelect;
