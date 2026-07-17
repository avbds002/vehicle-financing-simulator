import { useState } from "react";

interface RangeInputProps {
  label: string;
  id: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: (value: number) => void;
}

export const RangeInput = ({
  label,
  id,
  min = 0,
  max = 200000,
  step = 1000,
  defaultValue = 0,
  value: controlledValue,
  onChange,
}: RangeInputProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (isControlled && onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block font-semibold text-sm uppercase mb-1"
      >
        {label}
      </label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <input
          type="range"
          className="w-full sm:flex-1"
          id={`${id}-range`}
          name={`${id}-range`}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
        />
        <input
          type="number"
          className="border rounded px-3 py-1.5 text-center w-full sm:w-32"
          id={id}
          name={id}
          min={min}
          max={max}
          step={1}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
