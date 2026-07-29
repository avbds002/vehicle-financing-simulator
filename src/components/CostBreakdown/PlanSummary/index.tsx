import { formatCurrency } from "../../../utils/formatCurrency";
import { SummaryRow } from "../SummaryRow";

interface PlanSummaryProps {
  installments: number;
  financedAmount: number;
  finalVehicleValue: number;
}

export const PlanSummary = ({
  installments,
  financedAmount,
  finalVehicleValue,
}: PlanSummaryProps) => {
  return (
    <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6">
      <p className="text-blue-950 font-bold text-lg sm:text-xl">
        RESUMO DO PLANO
      </p>
      <div className="w-full space-y-1">
        <SummaryRow label="Parcelas:" value={`${installments}x`} />
        <SummaryRow
          label="Valor financiado:"
          value={formatCurrency(financedAmount)}
        />
        <SummaryRow
          label="Valor veiculo c/ juros:"
          value={formatCurrency(finalVehicleValue)}
        />
      </div>
    </div>
  );
};
