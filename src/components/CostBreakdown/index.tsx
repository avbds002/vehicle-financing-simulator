import type { SimulationData } from "../../types";
import { useFinancingCalculation } from "../../hooks/useFinancingCalculation";

interface CostBreakdownProps {
  latestSimulation: SimulationData | null;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const CostBreakdown = ({ latestSimulation }: CostBreakdownProps) => {
  const { totalPayable, totalInterest, installments, financedAmount } =
    useFinancingCalculation(latestSimulation);

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white grid grid-cols-1 lg:grid-cols-2">
      {/* Cost Wheel Section */}
      <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6">
        <p className="text-blue-950 font-bold text-lg sm:text-xl">
          RODA DE CUSTOS
        </p>
        <div>espaço roda de custos</div>
        <div className="w-full space-y-1">
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">
              Total a pagar:
            </p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {currencyFormatter.format(totalPayable)}
            </p>
          </div>
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">
              Total de juros:
            </p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {currencyFormatter.format(totalInterest)}
            </p>
          </div>
        </div>
      </div>

      {/* Divider — visible only on mobile (stacked layout) */}
      <div
        className="block lg:hidden mx-4 border-t border-slate-200"
        aria-hidden="true"
      />

      {/* Plan Summary Section */}
      <div className="flex flex-col items-start gap-3 sm:gap-4 p-4 sm:p-6">
        <p className="text-blue-950 font-bold text-lg sm:text-xl">
          RESUMO DO PLANO
        </p>
        <div className="w-full space-y-1">
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">Parcelas:</p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {installments}x
            </p>
          </div>
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">
              Total do financiamento:
            </p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {currencyFormatter.format(financedAmount)}
            </p>
          </div>
          <div className="flex flex-wrap justify-between sm:justify-start gap-2 sm:gap-6">
            <p className="text-sm sm:text-base text-slate-600">
              Valor total pago:
            </p>
            <p className="text-sm sm:text-base font-semibold text-blue-950">
              {currencyFormatter.format(totalPayable)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
