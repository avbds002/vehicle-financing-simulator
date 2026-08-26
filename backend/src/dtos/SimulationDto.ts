import { z } from 'zod';
import { StateRegion } from '../domain/enums/StateRegion';

/**
 * DTO para criação de uma simulação de financiamento.
 * Valida os campos de entrada conforme as regras de negócio (UC03).
 */
export const CreateSimulationSchema = z.object({
  vehicleValue: z
    .number({ required_error: 'Valor do veículo é obrigatório' })
    .min(10000, 'Valor do veículo deve ser de pelo menos R$ 10.000,00'),

  initialAmount: z
    .number({ required_error: 'Valor de entrada é obrigatório' })
    .min(0, 'Valor de entrada não pode ser negativo'),

  installments: z
    .number({ required_error: 'Número de parcelas é obrigatório' })
    .int('Número de parcelas deve ser um valor inteiro')
    .min(1, 'Número de parcelas deve ser pelo menos 1')
    .max(72, 'Número de parcelas não pode exceder 72'),

  interestRate: z
    .number({ required_error: 'Taxa de juros é obrigatória' })
    .min(0, 'Taxa de juros não pode ser negativa'),

  stateRegion: z.nativeEnum(StateRegion, {
    required_error: 'Estado/UF é obrigatório',
    invalid_type_error: 'Estado/UF inválido',
  }),
}).refine(
  (data) => data.initialAmount <= data.vehicleValue,
  {
    message: 'O valor de entrada não pode ser superior ao valor do veículo',
    path: ['initialAmount'],
  }
);

export type CreateSimulationDto = z.infer<typeof CreateSimulationSchema>;

// -----------------------------------------------------------------------

/**
 * DTO de resposta com os resultados calculados da simulação (Tabela Price).
 */
export interface SimulationResultDto {
  financedAmount: number;
  monthlyPayment: number;
  totalPayable: number;
  totalInterest: number;
  interestRate: number;
  installments: number;
  finalVehicleValue: number;
}
