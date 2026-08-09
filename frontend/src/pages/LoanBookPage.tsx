import { useSimulation } from "../hooks/useSimulation";
import { SimulationGrid } from "../components/LoanBookPageComponents";

export const LoanBookPage = () => {
  const { simulationHistory } = useSimulation();

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:p-12">
      <h2 className="text-blue-950 font-bold text-2xl sm:text-3xl mb-6">
        Livro de Financiamentos
      </h2>
      <SimulationGrid simulations={simulationHistory} />
    </main>
  );
};
