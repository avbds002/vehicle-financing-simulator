import { Request, Response, NextFunction } from 'express';
import { SimulationService } from '../services/SimulationService';
import { CreateSimulationSchema } from '../dtos/SimulationDto';

const simulationService = new SimulationService();

/**
 * SimulationController
 * Handlers HTTP para o endpoint de simulação:
 *   POST /api/simulations/calculate
 */
export class SimulationController {
  /**
   * POST /api/simulations/calculate
   * UC03 — Simular Financiamento de Veículo (Tabela Price)
   */
  static calculate(req: Request, res: Response, next: NextFunction): void {
    try {
      const dto = CreateSimulationSchema.parse(req.body);
      const result = simulationService.calculate(dto);

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
