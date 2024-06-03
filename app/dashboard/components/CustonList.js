import React from "react";

function CustonList({ label = "Species", placeholder, options = [] }) {
  return (
    <div className="h-12 border-b md:border md:rounded overflow-hidden flex items-center relative">
      <span className="h-full w-24 px-3 border-r bg-neutral-50 flex items-center text-sm text-neutral-500 shrink-0">
        {label}
      </span>

      <input
        placeholder={placeholder}
        className="h-full w-full px-3 outline-none bg-transparent"
        list={`${label}-list`}
      />
      <datalist id={`${label}-list`}>
        {options.map((option) => (
          <option key={option.value} value={option.label} />
        ))}
      </datalist>
    </div>
  );
}

export default CustonList;
