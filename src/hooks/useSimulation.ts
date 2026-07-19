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

  localStorage.setItem(
    "latest-simulation-value",
    JSON.stringify(latestSimulation),
  );

  const addSimulation = (entry: SimulationData) => {
    setSimulationHistory((prev) => [...prev, entry]);
  };

  return {
    simulationHistory,
    latestSimulation,
    addSimulation,
  };
}
