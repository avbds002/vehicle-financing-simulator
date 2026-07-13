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
              <option value="AC" className="font-semibold">
                Acre
              </option>
              <option value="AL" className="font-semibold">
                Alagoas
              </option>
              <option value="AP" className="font-semibold">
                Amapá
              </option>
              <option value="AM" className="font-semibold">
                Amazonas
              </option>
              <option value="BA" className="font-semibold">
                Bahia
              </option>
              <option value="CE" className="font-semibold">
                Ceará
              </option>
              <option value="DF" className="font-semibold">
                Distrito Federal
              </option>
              <option value="ES" className="font-semibold">
                Espírito Santo
              </option>
              <option value="GO" className="font-semibold">
                Goiás
              </option>
              <option value="MA" className="font-semibold">
                Maranhão
              </option>
              <option value="MT" className="font-semibold">
                Mato Grosso
              </option>
              <option value="MS" className="font-semibold">
                Mato Grosso do Sul
              </option>
              <option value="MG" className="font-semibold">
                Minas Gerais
              </option>
              <option value="PA" className="font-semibold">
                Pará
              </option>
              <option value="PB" className="font-semibold">
                Paraíba
              </option>
              <option value="PR" className="font-semibold">
                Paraná
              </option>
              <option value="PE" className="font-semibold">
                Pernambuco
              </option>
              <option value="PI" className="font-semibold">
                Piauí
              </option>
              <option value="RJ" className="font-semibold">
                Rio de Janeiro
              </option>
              <option value="RN" className="font-semibold">
                Rio Grande do Norte
              </option>
              <option value="RS" className="font-semibold">
                Rio Grande do Sul
              </option>
              <option value="RO" className="font-semibold">
                Rondônia
              </option>
              <option value="RR" className="font-semibold">
                Roraima
              </option>
              <option value="SC" className="font-semibold">
                Santa Catarina
              </option>
              <option value="SP" className="font-semibold">
                São Paulo
              </option>
              <option value="SE" className="font-semibold">
                Sergipe
              </option>
              <option value="TO" className="font-semibold">
                Tocantins
              </option>
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
