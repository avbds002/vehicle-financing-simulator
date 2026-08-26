import { z } from 'zod';
import { StateRegion } from '../domain/enums/StateRegion';

/**
 * DTO para salvar uma simulação no Livro de Financiamentos.
 * Reutiliza os campos de simulação com o resultado já calculado.
 */
export const SaveSimulationSchema = z.object({
  vehicleValue: z.number().min(10000),
  initialAmount: z.number().min(0),
  installments: z.number().int().min(1).max(72),
  interestRate: z.number().min(0),
  stateRegion: z.nativeEnum(StateRegion),
  financedAmount: z.number(),
  monthlyPayment: z.number(),
  totalPayable: z.number(),
  totalInterest: z.number(),
  finalVehicleValue: z.number(),
}).refine(
  (data) => data.initialAmount <= data.vehicleValue,
  {
    message: 'O valor de entrada não pode ser superior ao valor do veículo',
    path: ['initialAmount'],
  }
);

export type SaveSimulationDto = z.infer<typeof SaveSimulationSchema>;
