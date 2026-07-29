interface SummaryRowProps {
  label: string;
  value: string;
}

export const SummaryRow = ({ label, value }: SummaryRowProps) => {
  return (
    <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
      <p className="text-xs sm:text-base text-slate-600">{label}</p>
      <p className="text-xs sm:text-base font-semibold text-blue-950">
        {value}
      </p>
    </div>
  );
};
