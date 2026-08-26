import { Simulation } from '../entities/Simulation';
import { StateRegion } from '../enums/StateRegion';

export interface CreateSimulationData {
  userId?: string;
  vehicleValue: number;
  initialAmount: number;
  financedAmount: number;
  installments: number;
  interestRate: number;
  stateRegion: StateRegion;
  monthlyPayment: number;
  totalPayable: number;
  totalInterest: number;
  finalVehicleValue: number;
}

/**
 * Interface de repositório para operações de persistência de simulações.
 */
export interface ISimulationRepository {
  findById(id: string): Promise<Simulation | null>;
  findByUserId(userId: string): Promise<Simulation[]>;
  create(data: CreateSimulationData): Promise<Simulation>;
  delete(id: string): Promise<boolean>;
}
