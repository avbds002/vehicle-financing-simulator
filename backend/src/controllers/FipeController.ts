import { Request, Response, NextFunction } from 'express';
import { FipeService } from '../services/FipeService';
import { FilterVehicleSchema } from '../dtos/FipeDto';
import { VehicleRepositoryImpl } from '../repositories/VehicleRepositoryImpl';

const vehicleRepository = new VehicleRepositoryImpl();
const fipeService = new FipeService(vehicleRepository);

/**
 * FipeController
 * Handlers HTTP para a Tabela FIPE (rotas protegidas por JWT):
 *   GET /api/fipe/vehicles
 *   GET /api/fipe/vehicles/:id
 *   GET /api/fipe/filter-options
 */
export class FipeController {
  /**
   * GET /api/fipe/vehicles
   * UC07 — Consultar Tabela FIPE com Filtros
   * Query params: searchTerm, brand, model, year
   */
  static async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const filters = FilterVehicleSchema.parse(req.query);
      const vehicles = await fipeService.search(filters);

      res.status(200).json({ vehicles });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/fipe/vehicles/:id
   * UC08 — Visualizar Detalhes do Veículo FIPE
   */
  static async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const vehicle = await fipeService.getById(id);

      res.status(200).json({ vehicle });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/fipe/filter-options?brand=Toyota
   * Retorna marcas disponíveis ou modelos de uma marca específica
   */
  static async getFilterOptions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { brand } = req.query;
      const options = await fipeService.getFilterOptions(
        typeof brand === 'string' ? brand : undefined
      );

      res.status(200).json(options);
    } catch (err) {
      next(err);
    }
  }
}
