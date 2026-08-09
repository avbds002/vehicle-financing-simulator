import { useState, useEffect } from "react";
import type { SimulationData } from "../types";

export function useSimulation() {
  const [simulationHistory, setSimulationHistory] = useState<SimulationData[]>(
    () => {
      const stored = localStorage.getItem("simulation-history");
      return stored ? JSON.parse(stored) : [];
    }
  );

  const latestSimulation =
    simulationHistory.length > 0
      ? simulationHistory[simulationHistory.length - 1]
      : null;

  useEffect(() => {
    localStorage.setItem(
      "simulation-history",
      JSON.stringify(simulationHistory),
    );
    // Keep old key for backward compatibility or any other parts that might use it
    localStorage.setItem(
      "latest-simulation-value",
      JSON.stringify(latestSimulation),
    );
  }, [simulationHistory, latestSimulation]);

  const addSimulation = (entry: SimulationData) => {
    setSimulationHistory((prev) => [...prev, entry]);
  };

  return {
    simulationHistory,
    latestSimulation,
    addSimulation,
  };
}
