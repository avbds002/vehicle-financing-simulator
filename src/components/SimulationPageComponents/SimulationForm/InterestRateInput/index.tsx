interface InterestRateInputProps {
  value: string;
  onChange: (value: string) => void;
}

const INTEREST_RATE_OPTIONS = [
  { value: "1.8", label: "1.8% a.m." },
  { value: "2.0", label: "2.0% a.m." },
  { value: "2.1", label: "2.1% a.m." },
  { value: "2.2", label: "2.2% a.m." },
  { value: "2.3", label: "2.3% a.m." },
  { value: "2.4", label: "2.4% a.m." },
  { value: "2.5", label: "2.5% a.m." },
];

export const InterestRateInput = ({
  value,
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
      <select
        className="border rounded p-2 w-full font-semibold"
        name="interestRate"
        id="interestRate"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="null">Escolha uma opção</option>
        {INTEREST_RATE_OPTIONS.map((option) => (
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
