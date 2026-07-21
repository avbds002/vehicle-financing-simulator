interface InterestRateInputProps {
  value: number;
  min: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export const InterestRateInput = ({
  value,
  min,
  max = 5,
  step = 0.1,
  onChange,
}: InterestRateInputProps) => {
  return (
    <div className="mb-4">
      <label
        className="block font-semibold text-sm uppercase mb-1"
        htmlFor="interestRate"
      >
        Taxa de Juros (% a.m.)
      </label>
      <input
        type="number"
        className="border rounded p-2 w-full font-semibold"
        name="interestRate"
        id="interestRate"
        value={value}
        placeholder="Ex: 10.5"
        step={step}
        max={max}
        min={min}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
};
