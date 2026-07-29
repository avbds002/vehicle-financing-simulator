export interface SimulationData {
  vehicleValue: number;
  initialAmount: number;
  installments: number;
  stateRegion: string;
  interestRate: number;
}

export interface FinancingResult {
  financedAmount: number;
  monthlyPayment: number;
  totalPayable: number;
  totalInterest: number;
  interestRate: number;
  installments: number;
  finalVehicleValue: number;
}
