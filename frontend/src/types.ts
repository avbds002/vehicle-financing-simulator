export interface SimulationData {
  vehicleName: string;
  vehiclePhoto: string;
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

export interface RegisteredUser {
  fullName: string;
  email: string;
  dateOfBirth: string;
  cpf: string;
  username: string;
  password: string;
}

export interface Vehicle {
  id: number;
  name: string;
  version: string;
  year: string;
  fipePrice: string;
  consumption: string;
  insurance: string;
  image: string;
}
