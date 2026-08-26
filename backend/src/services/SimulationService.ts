import { CreateSimulationDto, SimulationResultDto } from '../dtos/SimulationDto';
import { PriceAmortizationCalculator } from './PriceAmortizationCalculator';
import { AppError } from './AuthService';

/**
 * SimulationService
 * UC03 — Simular Financiamento de Veículo (Tabela Price)
 * Valida os dados de entrada e invoca a calculadora financeira.
 */
export class SimulationService {
  /**
   * Executa a simulação de financiamento com base nos dados fornecidos.
   * Retorna o objeto com todos os valores calculados.
   */
  calculate(dto: CreateSimulationDto): SimulationResultDto {
    // Validações adicionais de negócio
    if (dto.initialAmount > dto.vehicleValue) {
      throw new AppError(
        'O valor de entrada não pode ser superior ao valor do veículo',
        400
      );
    }

    if (dto.vehicleValue <= 0) {
      throw new AppError('Valor do veículo deve ser maior que zero', 400);
    }

    if (dto.installments <= 0) {
      throw new AppError('Número de parcelas deve ser maior que zero', 400);
    }

    if (dto.interestRate < 0) {
      throw new AppError('Taxa de juros não pode ser negativa', 400);
    }

    const financedAmount = dto.vehicleValue - dto.initialAmount;

    return PriceAmortizationCalculator.calculate(
      financedAmount,
      dto.interestRate,
      dto.installments,
      dto.initialAmount
    );
  }
}
