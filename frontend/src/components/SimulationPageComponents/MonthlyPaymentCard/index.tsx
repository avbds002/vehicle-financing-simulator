import type { SimulationData } from "../../../types";
import { useFinancingCalculation } from "../../../hooks/useFinancingCalculation";

interface MonthlyPaymentCardProps {
  latestSimulation: SimulationData | null;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const MonthlyPaymentCard = ({
  latestSimulation,
}: MonthlyPaymentCardProps) => {
  const { monthlyPayment, financedAmount, interestRate } =
    useFinancingCalculation(latestSimulation);

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white">
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-4 p-4 sm:p-6">
        <h4 className="text-blue-950 font-semibold text-base sm:text-lg lg:text-xl">
          SUA PARCELA MENSAL
        </h4>
        <p className="text-blue-950 font-bold text-3xl sm:text-4xl lg:text-6xl">
          {currencyFormatter.format(monthlyPayment)}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6">
        <div className="text-center sm:text-left">
          <p className="text-blue-950 text-xs sm:text-sm">VALOR FINANCIADO:</p>
          <p className="text-blue-950 font-bold text-lg sm:text-xl">
            {currencyFormatter.format(financedAmount)}
          </p>
        </div>
        <div
          className="hidden sm:block w-px h-10 bg-slate-200"
          aria-hidden="true"
        />
        <div className="text-center sm:text-left">
          <p className="text-blue-950 text-xs sm:text-sm">TAXA DE JUROS:</p>
          <p className="text-blue-950 font-bold text-lg sm:text-xl">
            {interestRate.toFixed(2)}% A.M.
          </p>
        </div>
        <div
          className="hidden sm:block w-px h-10 bg-slate-200"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
