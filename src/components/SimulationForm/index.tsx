import { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { RangeInput } from "../RangeInput";

interface SimulationData {
  vehicleValue: number;
  initialAmount: number;
  installments: number;
  stateRegion: string;
}

export const SimulationForm = () => {
  const [vehicleValue, setVehicleValue] = useState(85000);
  const [initialAmount, setInitialAmount] = useState(25000);
  const [installments, setInstallments] = useState<string>("null");
  const [stateRegion, setStateRegion] = useState<string>("null");
  const [simulationHistory, setSimulationHistory] = useState<SimulationData[]>(
    [],
  );

  const VEHICLE_MIN = 10000;
  const INITIAL_AMOUNT_MIN = 5000;

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //Validation: negative integers NaN and checks for numeric fields

    //Check if the vehicle type is a number
    if (isNaN(vehicleValue) || typeof vehicleValue !== "number") {
      alert("Vehicle value cannot be NaN or string");
      setVehicleValue(VEHICLE_MIN);
    }

    //Check if the vehicle is a negative number
    if (vehicleValue < 0) {
      alert("Vehicle value cannot be a negative number");
      setVehicleValue(VEHICLE_MIN);
    }

    //Check if the initialAmount type is a number
    if (isNaN(initialAmount) || typeof initialAmount !== "number") {
      alert("Initial amount cannot be NaN or string");
      setInitialAmount(INITIAL_AMOUNT_MIN);
      return;
    }

    //Check if the initialAmount is a negative number
    if (initialAmount < 0) {
      alert("Initial amount cannot be a negative integer");
      setInitialAmount(INITIAL_AMOUNT_MIN);
      return;
    }

    //Validation: initialAmount cannot exceed vehicleValue
    if (initialAmount > vehicleValue) {
      alert("Initial Amount cannot exceed the vehicle value");
      setInitialAmount(INITIAL_AMOUNT_MIN);
      return;
    }

    //Check for NaN, negative integer or string for installments
    const parsedInstallments = Number(installments);
    if (isNaN(parsedInstallments) || parsedInstallments < 0) {
      alert("installments cannot be a negative integer or string");
      setInstallments("null");
      return;
    }

    //Build simulation entry and push to history
    const simulationEntry: SimulationData = {
      vehicleValue,
      initialAmount,
      installments: parsedInstallments,
      stateRegion,
    };

    setSimulationHistory((prev) => [...prev, simulationEntry]);

    alert(
      `Simulação realizada com sucesso!\nValor do veículo: R$ ${vehicleValue}\nValor da entrada: R$ ${initialAmount}\nNúmero de parcelas: ${parsedInstallments}\nEstado: ${stateRegion}`,
    );
  };

  const percentage =
    vehicleValue > 0 ? Math.round((initialAmount / vehicleValue) * 100) : 0;

  //Most recenet simulation (if any)
  const latestSimulation =
    simulationHistory.length > 0
      ? simulationHistory[simulationHistory.length - 1]
      : null;

  console.log(latestSimulation);

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
          <div className="mb-4">
            <label
              htmlFor="initialAmount"
              className="block font-semibold text-sm uppercase mb-1"
            >
              Valor da entrada (R$)
            </label>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4">
              <input
                type="range"
                className="w-full sm:flex-1"
                id="initialAmountRange"
                name="initialAmountRange"
                min={0}
                max={vehicleValue}
                step={1}
                value={initialAmount}
                onChange={(e) =>
                  handleInitialAmountChange(Number(e.target.value))
                }
              />
              <input
                type="number"
                className="border rounded px-3 py-1.5 text-center w-full sm:w-24"
                id="initialAmount"
                name="initialAmount"
                min={0}
                max={vehicleValue}
                step={1}
                value={initialAmount}
                onChange={(e) =>
                  handleInitialAmountChange(Number(e.target.value))
                }
              />
              <span id="percentageSpanValue" className="text-sm font-semibold">
                {percentage}%
              </span>
            </div>
          </div>
          {/*installments */}
          <div className="mb-4">
            <label
              className="block font-semibold text-sm uppercase mb-1"
              htmlFor="installments"
            >
              Plano de pagamento
            </label>
            <select
              className="border rounded p-2 w-full font-semibold"
              name="installments"
              id="installments"
              value={installments}
              onChange={(e) => setInstallments(e.target.value)}
            >
              <option value="null">Escolha uma opção</option>
              <option value="48" className="font-semibold">
                48 Meses
              </option>
              <option value="36" className="font-semibold">
                36 Meses
              </option>
              <option value="24" className="font-semibold">
                24 Meses
              </option>
              <option value="12" className="font-semibold">
                12 Meses
              </option>
            </select>
          </div>
          {/*stateRegion*/}
          <div className="mb-4">
            <label
              className="block font-semibold text-sm uppercase mb-1"
              htmlFor="stateRegion"
            >
              Estado
            </label>
            <select
              className="border rounded p-2 w-full font-semibold"
              name="stateRegion"
              id="stateRegion"
              value={stateRegion}
              onChange={(e) => setStateRegion(e.target.value)}
            >
              <option value="null">Escolha uma opção</option>
              {[
                { value: "AC", label: "Acre" },
                { value: "AL", label: "Alagoas" },
                { value: "AP", label: "Amapá" },
                { value: "AM", label: "Amazonas" },
                { value: "BA", label: "Bahia" },
                { value: "CE", label: "Ceará" },
                { value: "DF", label: "Distrito Federal" },
                { value: "ES", label: "Espírito Santo" },
                { value: "GO", label: "Goiás" },
                { value: "MA", label: "Maranhão" },
                { value: "MT", label: "Mato Grosso" },
                { value: "MS", label: "Mato Grosso do Sul" },
                { value: "MG", label: "Minas Gerais" },
                { value: "PA", label: "Pará" },
                { value: "PB", label: "Paraíba" },
                { value: "PR", label: "Paraná" },
                { value: "PE", label: "Pernambuco" },
                { value: "PI", label: "Piauí" },
                { value: "RJ", label: "Rio de Janeiro" },
                { value: "RN", label: "Rio Grande do Norte" },
                { value: "RS", label: "Rio Grande do Sul" },
                { value: "RO", label: "Rondônia" },
                { value: "RR", label: "Roraima" },
                { value: "SC", label: "Santa Catarina" },
                { value: "SP", label: "São Paulo" },
                { value: "SE", label: "Sergipe" },
                { value: "TO", label: "Tocantins" },
              ].map((state) => (
                <option
                  key={state.value}
                  value={state.value}
                  className="font-semibold"
                >
                  {state.label}
                </option>
              ))}
            </select>
          </div>
          {/*warning*/}
          <div className="flex items-start p-4">
            <IoIosWarning className="text-2xl text-gray-500 m-2" />
            <p className="text-xs tracking-tight text-gray-500">
              Esse aplicativo apenas tenta simular baseado nos parâmetros
              informados pelo usuário, caso queira valores mais próximos da
              realidade da sua região consulte uma concessionária próxima.
            </p>
          </div>
          <div className="flex items-center justify-center p-2">
            <button
              type="submit"
              className="p-4 bg-emerald-500 rounded-2xl w-full font-bold text-white text-shadow-2xl uppercase"
            >
              Calcular
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
