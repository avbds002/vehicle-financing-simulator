import { Vehicle } from '../entities/Vehicle';

export interface VehicleFilters {
  searchTerm?: string;
  brand?: string;
  model?: string;
  year?: number;
}

/**
 * Interface de repositório para operações da Tabela FIPE.
 */
export interface IVehicleRepository {
  findById(id: string): Promise<Vehicle | null>;
  findAll(filters?: VehicleFilters): Promise<Vehicle[]>;
  findBrands(): Promise<string[]>;
  findModelsByBrand(brand: string): Promise<string[]>;
}
