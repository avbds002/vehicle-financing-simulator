import { useState } from "react";
import { RangeInput } from "../RangeInput";
import { BRAZILIAN_STATES } from "../../constants/brazilianStates";
import { validateSimulationForm } from "../../utils/validateSimulationForm";

import type { SimulationData } from "../../types";
import { InitialAmountInput } from "./InitialAmountInput";
import { SelectInput } from "./SelectInput";
import { InterestRateInput } from "./InterestRateInput";
import { FormDisclaimer } from "./FormDisclaimer";
import { SubmitButton } from "./SubmitButton";

interface SimulationFormProps {
  addSimulation: (entry: SimulationData) => void;
}

const VEHICLE_MIN = 10000;
const INTEREST_RATE_MIN = 1;

const INSTALLMENT_OPTIONS = [
  { value: "60", label: "60 Meses" },
  { value: "48", label: "48 Meses" },
  { value: "36", label: "36 Meses" },
  { value: "24", label: "24 Meses" },
  { value: "12", label: "12 Meses" },
];

export const SimulationForm = ({ addSimulation }: SimulationFormProps) => {
  const [vehicleValue, setVehicleValue] = useState(85000);
  const [initialAmount, setInitialAmount] = useState(25000);
  const [installments, setInstallments] = useState<string>("null");
  const [stateRegion, setStateRegion] = useState<string>("null");
  const [interestRate, setInterestRate] = useState(0);

  const handleVehicleChange = (newValue: number) => {
    setVehicleValue(newValue);
    // Clamp initialAmount if it exceeds the new vehicle value
    if (initialAmount > newValue) {
      setInitialAmount(newValue);
    }
  };

  const handleInitialAmountChange = (newValue: number) => {
    // Never allow initialAmount to exceed vehicleValue
    setInitialAmount(Math.min(newValue, vehicleValue));
  };

  const handleInterestRateChange = (newValue: number) => {
    setInterestRate(Math.max(newValue, INTEREST_RATE_MIN));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = validateSimulationForm({
      vehicleValue,
      initialAmount,
      installments,
      interestRate,
    });

    if (result.resetVehicleValue !== undefined)
      setVehicleValue(result.resetVehicleValue);
    if (result.resetInitialAmount !== undefined)
      setInitialAmount(result.resetInitialAmount);
    if (result.resetInstallments !== undefined)
      setInstallments(result.resetInstallments);
    if (result.resetInterestRate !== undefined)
      setInterestRate(result.resetInterestRate);

    if (!result.isValid) return;

    //Build simulation entry and push to history
    const simulationEntry: SimulationData = {
      vehicleValue,
      initialAmount,
      installments: result.parsedInstallments,
      stateRegion,
      interestRate,
    };

    addSimulation(simulationEntry);
  };

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white">
      <div className="bg-blue-800 border-none rounded-t-2xl font-bold text-white text-xl sm:text-2xl lg:text-3xl text-shadow-md p-3">
        <h3>FAÇA SUA SIMULAÇÃO</h3>
      </div>
      <div className="p-4 sm:p-6">
        <form action="#" onSubmit={handleSubmit}>
          {/*Input container - vehicle */}
          <RangeInput
            label="Valor do veículo (R$)"
            id="vehicleValue"
            min={VEHICLE_MIN}
            max={200000}
            step={1000}
            value={vehicleValue}
            onChange={handleVehicleChange}
          />
          {/*initialAmount value*/}
          <InitialAmountInput
            value={initialAmount}
            max={vehicleValue}
            onChange={handleInitialAmountChange}
          />
          {/*installments */}
          <SelectInput
            label="Plano de pagamento"
            id="installments"
            value={installments}
            options={INSTALLMENT_OPTIONS}
            onChange={setInstallments}
          />
          {/*stateRegion*/}
          <SelectInput
            label="Estado"
            id="stateRegion"
            value={stateRegion}
            options={BRAZILIAN_STATES}
            onChange={setStateRegion}
          />
          {/*Interest rate */}
          <InterestRateInput
            value={interestRate}
            min={INTEREST_RATE_MIN}
            onChange={handleInterestRateChange}
          />
          {/*warning*/}
          <FormDisclaimer />
          <SubmitButton label="Calcular" />
        </form>
      </div>
    </div>
  );
};
