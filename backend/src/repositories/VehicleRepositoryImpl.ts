import { IVehicleRepository, VehicleFilters } from '../domain/repositories/IVehicleRepository';
import { Vehicle } from '../domain/entities/Vehicle';
import { prisma } from '../config/prisma';
import { Prisma } from '@prisma/client';

/**
 * Implementação concreta do IVehicleRepository utilizando Prisma ORM.
 */
export class VehicleRepositoryImpl implements IVehicleRepository {
  async findById(id: string): Promise<Vehicle | null> {
    const record = await prisma.vehicle.findUnique({ where: { id } });
    if (!record) return null;
    return this.toEntity(record);
  }

  async findAll(filters?: VehicleFilters): Promise<Vehicle[]> {
    const where: Prisma.VehicleWhereInput = {};

    if (filters?.searchTerm) {
      where.OR = [
        { name: { contains: filters.searchTerm, mode: 'insensitive' } },
        { brand: { contains: filters.searchTerm, mode: 'insensitive' } },
        { model: { contains: filters.searchTerm, mode: 'insensitive' } },
        { version: { contains: filters.searchTerm, mode: 'insensitive' } },
      ];
    }

    if (filters?.brand) {
      where.brand = { equals: filters.brand, mode: 'insensitive' };
    }

    if (filters?.model) {
      where.model = { contains: filters.model, mode: 'insensitive' };
    }

    if (filters?.year) {
      where.year = filters.year;
    }

    const records = await prisma.vehicle.findMany({
      where,
      orderBy: [{ brand: 'asc' }, { model: 'asc' }],
    });

    return records.map((r) => this.toEntity(r));
  }

  async findBrands(): Promise<string[]> {
    const result = await prisma.vehicle.findMany({
      select: { brand: true },
      distinct: ['brand'],
      orderBy: { brand: 'asc' },
    });
    return result.map((r) => r.brand);
  }

  async findModelsByBrand(brand: string): Promise<string[]> {
    const result = await prisma.vehicle.findMany({
      where: { brand: { equals: brand, mode: 'insensitive' } },
      select: { model: true },
      distinct: ['model'],
      orderBy: { model: 'asc' },
    });
    return result.map((r) => r.model);
  }

  private toEntity(record: {
    id: string;
    name: string;
    brand: string;
    model: string;
    version: string;
    year: number;
    fipePrice: number;
    consumption: number;
    insurance: number;
    imageUrl: string | null;
  }): Vehicle {
    return new Vehicle({
      id: record.id,
      name: record.name,
      brand: record.brand,
      model: record.model,
      version: record.version,
      year: record.year,
      fipePrice: record.fipePrice,
      consumption: record.consumption,
      insurance: record.insurance,
      imageUrl: record.imageUrl,
    });
  }
}
