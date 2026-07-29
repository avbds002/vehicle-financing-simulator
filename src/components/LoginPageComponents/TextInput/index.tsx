interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  maxLength?: number;
  error?: string;
}

export const TextInput = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  maxLength,
  error,
}: TextInputProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-sm font-semibold text-slate-700 mb-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-slate-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      {maxLength && (
        <p className="text-slate-400 text-xs mt-1 text-right">
          {value.length}/{maxLength}
        </p>
      )}
    </div>
  );
};
