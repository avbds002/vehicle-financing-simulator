import { StateRegion } from '../enums/StateRegion';

/**
 * Entidade de domínio: Simulation
 * Representa o resultado de uma simulação de financiamento via Tabela Price.
 */
export class Simulation {
  public readonly id: string;
  public readonly userId: string | null;
  public readonly vehicleValue: number;
  public readonly initialAmount: number;
  public readonly financedAmount: number;
  public readonly installments: number;
  public readonly interestRate: number;
  public readonly stateRegion: StateRegion;
  public readonly monthlyPayment: number;
  public readonly totalPayable: number;
  public readonly totalInterest: number;
  public readonly finalVehicleValue: number;
  public readonly createdAt: Date;

  constructor(props: {
    id: string;
    userId: string | null;
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
    createdAt: Date;
  }) {
    this.id = props.id;
    this.userId = props.userId;
    this.vehicleValue = props.vehicleValue;
    this.initialAmount = props.initialAmount;
    this.financedAmount = props.financedAmount;
    this.installments = props.installments;
    this.interestRate = props.interestRate;
    this.stateRegion = props.stateRegion;
    this.monthlyPayment = props.monthlyPayment;
    this.totalPayable = props.totalPayable;
    this.totalInterest = props.totalInterest;
    this.finalVehicleValue = props.finalVehicleValue;
    this.createdAt = props.createdAt;
  }
}
