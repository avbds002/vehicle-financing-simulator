import type { SimulationData } from "../../../types";
import { SimulationCard } from "../SimulationCard";

interface SimulationGridProps {
  simulations: SimulationData[];
}

export const SimulationGrid = ({ simulations }: SimulationGridProps) => {
  if (simulations.length === 0) {
    return (
      <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
        <p className="text-slate-500 text-lg font-medium">
          Nenhuma simulação salva no histórico.
        </p>
        <p className="text-slate-400 text-sm mt-2">
          Vá até a página principal e faça sua primeira simulação!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[912px]:grid-cols-2 xl:grid-cols-4 gap-6">
      {simulations.map((simulation, index) => (
        // Usando o index como key temporária pois a SimulationData não possui um id único.
        // O ideal seria adicionar um 'id' na interface SimulationData no futuro.
        <SimulationCard key={index} simulation={simulation} />
      ))}
    </div>
  );
};
