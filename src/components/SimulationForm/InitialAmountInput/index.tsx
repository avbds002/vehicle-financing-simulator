interface InitialAmountInputProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export const InitialAmountInput = ({
  value,
  max,
  onChange,
}: InitialAmountInputProps) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className="mb-4">
      <label
        htmlFor="initialAmount"
        className="block font-semibold text-sm uppercase mb-1"
      >
        Valor da entrada (R$)
      </label>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
        <input
          type="range"
          className="w-full sm:flex-1"
          id="initialAmountRange"
          name="initialAmountRange"
          min={0}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <input
          type="number"
          className="border rounded px-3 py-1.5 text-center w-full sm:w-24"
          id="initialAmount"
          name="initialAmount"
          min={0}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <span id="percentageSpanValue" className="text-sm font-semibold">
          {percentage}%
        </span>
      </div>
    </div>
  );
};
