import { useState } from "react";
import { IoIosWarning } from "react-icons/io";
import { RangeInput } from "../RangeInput";

export const SimulationForm = () => {
  const [vehicleValue, setVehicleValue] = useState(85000);
  const [initialAmount, setInitialAmount] = useState(25000);

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

  const percentage =
    vehicleValue > 0 ? Math.round((initialAmount / vehicleValue) * 100) : 0;

  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white">
      <div className="bg-blue-800 border-none rounded-t-2xl font-bold text-white text-xl sm:text-2xl lg:text-3xl text-shadow-md p-3">
        <h3>FAÇA SUA SIMULAÇÃO</h3>
      </div>
      <div className="p-4 sm:p-6">
        <form action="#">
          {/*Input container - vehicle */}
          <RangeInput
            label="Valor do veículo (R$)"
            id="vehicleValue"
            min={0}
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
                step={1000}
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
                step={1000}
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
          {/*Interest rate */}
          <div className="mb-4">
            <label
              className="block font-semibold text-sm uppercase mb-1"
              htmlFor="interestRate"
            >
              Taxa de Juros (% a.a.)
            </label>
            <input
              type="number"
              className="border rounded p-2 w-full font-semibold"
              name="interestRate"
              id="interestRate"
              placeholder="Ex: 10.5"
              step="0.1"
              min="0"
            />
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
