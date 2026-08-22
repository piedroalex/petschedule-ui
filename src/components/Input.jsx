import React from "react";

export function Input({
  label,
  id,
  type = "text",
  error,
  icon: Icon,
  className = "",
  ...props
}) {
  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3 text-slate-400 pointer-events-none">
            <Icon size={18} />
          </div>
        )}

        <input
          id={id}
          type={type}
          className={`w-full rounded-lg border bg-white py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all outline-none 
            ${Icon ? "pl-10 pr-3.5" : "px-3.5"}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            } ${className}`}
          {...props}
        />
      </div>

      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
}

export default Input;