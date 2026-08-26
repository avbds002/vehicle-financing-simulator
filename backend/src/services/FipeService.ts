import { IVehicleRepository, VehicleFilters } from '../domain/repositories/IVehicleRepository';
import { FilterVehicleDto } from '../dtos/FipeDto';
import { AppError } from './AuthService';

/**
 * FipeService
 * UC07 — Consultar Tabela FIPE com Filtros
 * UC08 — Visualizar Detalhes do Veículo FIPE
 */
export class FipeService {
  constructor(private readonly vehicleRepository: IVehicleRepository) {}

  /**
   * UC07 — Busca e filtra veículos da Tabela FIPE.
   */
  async search(filters: FilterVehicleDto) {
    const vehicleFilters: VehicleFilters = {
      searchTerm: filters.searchTerm,
      brand: filters.brand,
      model: filters.model,
      year: filters.year,
    };

    return this.vehicleRepository.findAll(vehicleFilters);
  }

  /**
   * UC08 — Retorna os detalhes completos de um veículo FIPE pelo ID.
   */
  async getById(id: string) {
    const vehicle = await this.vehicleRepository.findById(id);

    if (!vehicle) {
      throw new AppError('Veículo não encontrado', 404);
    }

    return vehicle;
  }

  /**
   * Retorna as opções de filtro disponíveis (marcas e modelos por marca).
   */
  async getFilterOptions(brand?: string) {
    if (brand) {
      const models = await this.vehicleRepository.findModelsByBrand(brand);
      return { models };
    }

    const brands = await this.vehicleRepository.findBrands();
    return { brands };
  }
}
