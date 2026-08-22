import React from "react";

export function Button({
  children,
  type = "button",
  variant = "primary",
  isLoading = false,
  className = "",
  ...props
}) {
  const baseStyles =
    "w-full flex items-center justify-center gap-2 rounded-lg py-2.5 px-4 font-semibold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer shadow-sm";

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white focus:ring-blue-500 shadow-blue-100",
    secondary:
      "bg-slate-100 hover:bg-slate-200 text-slate-700 focus:ring-slate-300",
    outline:
      "border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-slate-300",
  };

  return (
    <button
      type={type}
      disabled={isLoading || props.disabled}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Aguarde...
        </span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;