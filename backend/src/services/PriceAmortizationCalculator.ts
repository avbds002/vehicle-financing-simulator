import { SimulationResultDto } from '../dtos/SimulationDto';

/**
 * PriceAmortizationCalculator
 * Implementa o Sistema de Amortização Price (Tabela Price).
 *
 * Fórmula:
 *   PMT = PV × [ i × (1 + i)^n ] / [ (1 + i)^n - 1 ]
 *
 * Onde:
 *   PV = Valor Financiado (vehicleValue - initialAmount)
 *   i  = Taxa de juros mensal em decimal (interestRate / 100)
 *   n  = Número de parcelas (installments)
 */
export class PriceAmortizationCalculator {
  /**
   * Calcula os valores de financiamento utilizando a Tabela Price.
   *
   * @param pv            - Valor financiado (PV)
   * @param interestRate  - Taxa de juros mensal em % (ex: 1.45)
   * @param installments  - Número de parcelas (n)
   * @param initialAmount - Valor de entrada (para cálculo do custo final)
   * @returns             - Objeto com todos os valores calculados
   */
  static calculate(
    pv: number,
    interestRate: number,
    installments: number,
    initialAmount: number
  ): SimulationResultDto {
    let monthlyPayment: number;

    if (interestRate === 0) {
      // Sem juros: divisão simples do principal
      monthlyPayment = pv / installments;
    } else {
      const i = interestRate / 100;
      const factor = Math.pow(1 + i, installments);
      monthlyPayment = pv * (i * factor) / (factor - 1);
    }

    const totalPayable = this.round(monthlyPayment * installments);
    const totalInterest = this.round(totalPayable - pv);
    const finalVehicleValue = this.round(totalPayable + initialAmount);

    return {
      financedAmount: this.round(pv),
      monthlyPayment: this.round(monthlyPayment),
      totalPayable,
      totalInterest,
      interestRate,
      installments,
      finalVehicleValue,
    };
  }

  /**
   * Arredonda um valor para 2 casas decimais.
   */
  private static round(value: number): number {
    return Math.round(value * 100) / 100;
  }
}
