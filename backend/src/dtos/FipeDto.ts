import { z } from 'zod';

/**
 * DTO para filtros de busca de veículos na Tabela FIPE.
 */
export const FilterVehicleSchema = z.object({
  searchTerm: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  year: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : undefined))
    .pipe(z.number().int().min(1900).max(2100).optional()),
});

export type FilterVehicleDto = z.infer<typeof FilterVehicleSchema>;
