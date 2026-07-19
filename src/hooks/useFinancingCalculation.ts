import { useMemo } from "react";
import type { SimulationData } from "../types";

export interface FinancingResult {
  financedAmount: number;
  monthlyPayment: number;
  totalPayable: number;
  totalInterest: number;
  interestRate: number;
  installments: number;
}

/**
 * Calculates financing values using the Price amortization system (Tabela Price).
 *
 * Formula:  PMT = PV × [ i × (1 + i)^n ] / [ (1 + i)^n − 1 ]
 *
 * Where:
 *  - PV  = financed amount (vehicleValue − initialAmount)
 *  - i   = monthly interest rate as a decimal (interestRate / 100)
 *  - n   = number of installments
 */
export function useFinancingCalculation(
  simulation: SimulationData | null,
): FinancingResult {
  return useMemo(() => {
    if (!simulation || simulation.installments <= 0) {
      return {
        financedAmount: 0,
        monthlyPayment: 0,
        totalPayable: 0,
        totalInterest: 0,
        interestRate: 0,
        installments: 0,
      };
    }

    const { vehicleValue, initialAmount, installments, interestRate } =
      simulation;

    const financedAmount = vehicleValue - initialAmount;

    // Edge case: zero interest — simple division
    if (interestRate === 0) {
      const monthlyPayment = financedAmount / installments;
      return {
        financedAmount,
        monthlyPayment,
        totalPayable: monthlyPayment * installments,
        totalInterest: 0,
        interestRate: 0,
        installments,
      };
    }

    const i = interestRate / 100; // e.g. 1.25 → 0.0125
    const n = installments;
    const factor = Math.pow(1 + i, n);

    // PMT = PV × [ i × (1+i)^n ] / [ (1+i)^n − 1 ]
    const monthlyPayment = financedAmount * ((i * factor) / (factor - 1));

    const totalPayable = monthlyPayment * n;
    const totalInterest = totalPayable - financedAmount;

    return {
      financedAmount,
      monthlyPayment,
      totalPayable,
      totalInterest,
      interestRate,
      installments,
    };
  }, [simulation]);
}
