export interface SimulationFormValues {
  vehicleValue: number;
  initialAmount: number;
  installments: string;
  interestRate: number;
}

export interface ValidationResult {
  isValid: boolean;
  resetVehicleValue?: number;
  resetInitialAmount?: number;
  resetInstallments?: string;
  resetInterestRate?: number;
  parsedInstallments: number;
}

const VEHICLE_MIN = 10000;
const INITIAL_AMOUNT_MIN = 5000;

/**
 * Validates all simulation form fields.
 * Shows alert messages and returns reset values when validation fails,
 * preserving the original component behavior exactly.
 */
export function validateSimulationForm(
  values: SimulationFormValues,
): ValidationResult {
  const { vehicleValue, initialAmount, installments } = values;

  //Check if the vehicle type is a number
  if (isNaN(vehicleValue) || typeof vehicleValue !== "number") {
    alert("Vehicle value cannot be NaN or string");
    return {
      isValid: false,
      resetVehicleValue: VEHICLE_MIN,
      parsedInstallments: 0,
    };
  }

  //Check if the vehicle is a negative number
  if (vehicleValue < 0) {
    alert("Vehicle value cannot be a negative number");
    return {
      isValid: false,
      resetVehicleValue: VEHICLE_MIN,
      parsedInstallments: 0,
    };
  }

  //Check if the initialAmount type is a number
  if (isNaN(initialAmount) || typeof initialAmount !== "number") {
    alert("Initial amount cannot be NaN or string");
    return {
      isValid: false,
      resetInitialAmount: INITIAL_AMOUNT_MIN,
      parsedInstallments: 0,
    };
  }

  //Check if the initialAmount is a negative number
  if (initialAmount < 0) {
    alert("Initial amount cannot be a negative integer");
    return {
      isValid: false,
      resetInitialAmount: INITIAL_AMOUNT_MIN,
      parsedInstallments: 0,
    };
  }

  //Validation: initialAmount cannot exceed vehicleValue
  if (initialAmount > vehicleValue) {
    alert("Initial Amount cannot exceed the vehicle value");
    return {
      isValid: false,
      resetInitialAmount: INITIAL_AMOUNT_MIN,
      parsedInstallments: 0,
    };
  }

  //Check for NaN, negative integer or string for installments
  const parsedInstallments = Number(installments);
  if (isNaN(parsedInstallments) || parsedInstallments < 0) {
    alert("installments cannot be a negative integer or string");
    return {
      isValid: false,
      resetInstallments: "null",
      parsedInstallments: 0,
    };
  }

  return { isValid: true, parsedInstallments };
}
