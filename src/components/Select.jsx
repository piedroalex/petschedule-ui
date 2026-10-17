export function Select({ label, id, name, value, onChange, error, options, ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id || name} className="block text-xs font-semibold uppercase text-slate-600 mb-1.5">
          {label}
        </label>
      )}
      <select
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl text-slate-800 focus:outline-none focus:ring-2 transition-all ${
          error
            ? "border-red-400 focus:ring-red-200 bg-red-50/30"
            : "border-slate-200 focus:border-blue-500 focus:ring-blue-100 focus:bg-white"
        }`}
        {...props}
      >
        <option value="">Selecione uma opção...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 mt-1.5 font-medium">{error}</p>}
    </div>
  );
}