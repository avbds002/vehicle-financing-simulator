import { useState } from "react";
import type { SimulationData } from "../types";

export function useSimulation() {
  const [simulationHistory, setSimulationHistory] = useState<SimulationData[]>(
    [],
  );

  const latestSimulation =
    simulationHistory.length > 0
      ? simulationHistory[simulationHistory.length - 1]
      : null;

  const addSimulation = (entry: SimulationData) => {
    setSimulationHistory((prev) => [...prev, entry]);
  };

  return {
    simulationHistory,
    latestSimulation,
    addSimulation,
  };
}
