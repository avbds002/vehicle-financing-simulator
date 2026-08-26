import {
  ISimulationRepository,
  CreateSimulationData,
} from '../domain/repositories/ISimulationRepository';
import { Simulation } from '../domain/entities/Simulation';
import { StateRegion } from '../domain/enums/StateRegion';
import { prisma } from '../config/prisma';
import { StateRegion as PrismaStateRegion } from '@prisma/client';

/**
 * Implementação concreta do ISimulationRepository utilizando Prisma ORM.
 */
export class SimulationRepositoryImpl implements ISimulationRepository {
  async findById(id: string): Promise<Simulation | null> {
    const record = await prisma.simulation.findUnique({ where: { id } });
    if (!record) return null;
    return this.toEntity(record);
  }

  async findByUserId(userId: string): Promise<Simulation[]> {
    const records = await prisma.simulation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return records.map((r) => this.toEntity(r));
  }

  async create(data: CreateSimulationData): Promise<Simulation> {
    const record = await prisma.simulation.create({
      data: {
        userId: data.userId ?? null,
        vehicleValue: data.vehicleValue,
        initialAmount: data.initialAmount,
        financedAmount: data.financedAmount,
        installments: data.installments,
        interestRate: data.interestRate,
        stateRegion: data.stateRegion as PrismaStateRegion,
        monthlyPayment: data.monthlyPayment,
        totalPayable: data.totalPayable,
        totalInterest: data.totalInterest,
        finalVehicleValue: data.finalVehicleValue,
      },
    });
    return this.toEntity(record);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.simulation.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  private toEntity(record: {
    id: string;
    userId: string | null;
    vehicleValue: number;
    initialAmount: number;
    financedAmount: number;
    installments: number;
    interestRate: number;
    stateRegion: PrismaStateRegion;
    monthlyPayment: number;
    totalPayable: number;
    totalInterest: number;
    finalVehicleValue: number;
    createdAt: Date;
  }): Simulation {
    return new Simulation({
      id: record.id,
      userId: record.userId,
      vehicleValue: record.vehicleValue,
      initialAmount: record.initialAmount,
      financedAmount: record.financedAmount,
      installments: record.installments,
      interestRate: record.interestRate,
      stateRegion: record.stateRegion as unknown as StateRegion,
      monthlyPayment: record.monthlyPayment,
      totalPayable: record.totalPayable,
      totalInterest: record.totalInterest,
      finalVehicleValue: record.finalVehicleValue,
      createdAt: record.createdAt,
    });
  }
}
