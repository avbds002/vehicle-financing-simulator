import { ISimulationRepository } from '../domain/repositories/ISimulationRepository';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { SaveSimulationDto } from '../dtos/LoanBookDto';
import { AppError } from './AuthService';

/**
 * LoanBookService
 * Gerencia o histórico de simulações salvas no Livro de Financiamentos.
 * UC04 — Salvar simulação
 * UC05 — Consultar simulações
 * UC06 — Excluir simulação
 */
export class LoanBookService {
  constructor(
    private readonly simulationRepository: ISimulationRepository,
    private readonly userRepository: IUserRepository
  ) {}

  /**
   * UC04 — Salva uma simulação vinculada ao usuário autenticado.
   */
  async saveSimulation(userId: string, dto: SaveSimulationDto) {
    // Verifica se o usuário existe
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    return this.simulationRepository.create({
      userId,
      vehicleValue: dto.vehicleValue,
      initialAmount: dto.initialAmount,
      financedAmount: dto.financedAmount,
      installments: dto.installments,
      interestRate: dto.interestRate,
      stateRegion: dto.stateRegion,
      monthlyPayment: dto.monthlyPayment,
      totalPayable: dto.totalPayable,
      totalInterest: dto.totalInterest,
      finalVehicleValue: dto.finalVehicleValue,
    });
  }

  /**
   * UC05 — Retorna todas as simulações salvas pelo usuário autenticado.
   */
  async getUserSimulations(userId: string) {
    return this.simulationRepository.findByUserId(userId);
  }

  /**
   * UC06 — Exclui uma simulação, verificando que pertence ao usuário autenticado.
   */
  async deleteSimulation(simulationId: string, userId: string): Promise<void> {
    const simulation = await this.simulationRepository.findById(simulationId);

    if (!simulation) {
      throw new AppError('Simulação não encontrada', 404);
    }

    if (simulation.userId !== userId) {
      throw new AppError('Você não tem permissão para excluir esta simulação', 403);
    }

    await this.simulationRepository.delete(simulationId);
  }
}
