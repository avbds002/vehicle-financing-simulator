import {
  CostBreakdown,
  MonthlyPaymentCard,
  SimulationForm,
} from "../components/SimulationPageComponents";
import { useSimulation } from "../hooks/useSimulation";

export const SimulationPage = () => {
  const { latestSimulation, addSimulation } = useSimulation();

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:p-12">
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          {/*LEFT COLUMN: form*/}
          <SimulationForm addSimulation={addSimulation} />
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7 lg:gap-8">
          {/*Right column: results grid*/}
          <MonthlyPaymentCard latestSimulation={latestSimulation} />
          <CostBreakdown latestSimulation={latestSimulation} />
        </div>
      </div>
    </main>
  );
};
