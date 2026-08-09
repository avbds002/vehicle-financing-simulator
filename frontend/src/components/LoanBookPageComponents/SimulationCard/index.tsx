import { MdOutlineAttachMoney, MdOutlineCalendarMonth } from "react-icons/md";
import { TbPercentage } from "react-icons/tb";
import { FaCar } from "react-icons/fa";
import type { SimulationData } from "../../../types";
import { useFinancingCalculation } from "../../../hooks/useFinancingCalculation";

interface SimulationCardProps {
  simulation: SimulationData;
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const SimulationCard = ({ simulation }: SimulationCardProps) => {
  const {
    monthlyPayment,
    financedAmount,
    installments,
    interestRate,
    finalVehicleValue,
  } = useFinancingCalculation(simulation);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col">
      {/* Vehicle image or placeholder */}
      <div className="relative bg-slate-100 h-48 flex items-center justify-center overflow-hidden">
        {simulation.vehiclePhoto ? (
          <img
            src={simulation.vehiclePhoto}
            alt={simulation.vehicleName || "Veículo"}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <FaCar className="text-slate-300 text-6xl" />
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name and State */}
        <h3 className="text-slate-800 font-bold text-lg leading-tight min-h-[3.5rem] flex items-start">
          {simulation.vehicleName || "Veículo Não Informado"}
        </h3>
        <p className="text-slate-500 text-sm mb-4">
          Estado: {simulation.stateRegion !== "null" ? simulation.stateRegion : "Não informado"}
        </p>

        {/* Monthly Payment */}
        <div className="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
          <p className="text-blue-800 text-xs font-bold uppercase mb-1">Parcela Mensal</p>
          <p className="text-blue-600 font-extrabold text-2xl">
            {currencyFormatter.format(monthlyPayment)}
          </p>
        </div>

        {/* Statistics Grid */}
        <div className="mt-auto grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase">
              <MdOutlineCalendarMonth className="text-blue-500 text-sm" />
              <span>Parcelas</span>
            </div>
            <span className="text-slate-700 text-sm font-bold">{installments}x</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase">
              <TbPercentage className="text-blue-500 text-sm" />
              <span>Taxa Juros</span>
            </div>
            <span className="text-slate-700 text-sm font-bold">{interestRate.toFixed(2)}% a.m.</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase">
              <MdOutlineAttachMoney className="text-blue-500 text-sm" />
              <span>Financiado</span>
            </div>
            <span className="text-slate-700 text-sm font-bold">{currencyFormatter.format(financedAmount)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold uppercase">
              <FaCar className="text-blue-500 text-sm" />
              <span>Total c/ Juros</span>
            </div>
            <span className="text-slate-700 text-sm font-bold">{currencyFormatter.format(finalVehicleValue)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
