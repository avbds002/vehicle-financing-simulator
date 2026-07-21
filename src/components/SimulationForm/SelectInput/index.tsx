interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  id: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SelectInput = ({
  label,
  id,
  value,
  options,
  onChange,
  placeholder = "Escolha uma opção",
}: SelectInputProps) => {
  return (
    <div className="mb-4">
      <label
        className="block font-semibold text-sm uppercase mb-1"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="border rounded p-2 w-full font-semibold"
        name={id}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="null">{placeholder}</option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="font-semibold"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
