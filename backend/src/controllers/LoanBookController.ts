import { Request, Response, NextFunction } from 'express';
import { LoanBookService } from '../services/LoanBookService';
import { SaveSimulationSchema } from '../dtos/LoanBookDto';
import { SimulationRepositoryImpl } from '../repositories/SimulationRepositoryImpl';
import { UserRepositoryImpl } from '../repositories/UserRepositoryImpl';

const simulationRepository = new SimulationRepositoryImpl();
const userRepository = new UserRepositoryImpl();
const loanBookService = new LoanBookService(simulationRepository, userRepository);

/**
 * LoanBookController
 * Handlers HTTP para o Livro de Financiamentos (rotas protegidas por JWT):
 *   POST   /api/loan-book
 *   GET    /api/loan-book
 *   DELETE /api/loan-book/:id
 */
export class LoanBookController {
  /**
   * POST /api/loan-book
   * UC04 — Salvar Simulação no Livro de Financiamentos
   */
  static async save(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const dto = SaveSimulationSchema.parse(req.body);
      const simulation = await loanBookService.saveSimulation(userId, dto);

      res.status(201).json({
        message: 'Simulação salva com sucesso',
        simulation,
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * GET /api/loan-book
   * UC05 — Consultar Livro de Financiamentos
   */
  static async list(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const simulations = await loanBookService.getUserSimulations(userId);

      res.status(200).json({ simulations });
    } catch (err) {
      next(err);
    }
  }

  /**
   * DELETE /api/loan-book/:id
   * UC06 — Excluir Simulação do Livro de Financiamentos
   */
  static async remove(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userId = req.user!.id;
      const { id } = req.params;

      await loanBookService.deleteSimulation(id, userId);

      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
