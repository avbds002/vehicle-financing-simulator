/**
 * Entidade de domínio: Vehicle (Tabela FIPE)
 * Representa os dados de catálogo de um veículo.
 */
export class Vehicle {
  public readonly id: string;
  public readonly name: string;
  public readonly brand: string;
  public readonly model: string;
  public readonly version: string;
  public readonly year: number;
  public readonly fipePrice: number;
  public readonly consumption: number;
  public readonly insurance: number;
  public readonly imageUrl: string | null;

  constructor(props: {
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
  }) {
    this.id = props.id;
    this.name = props.name;
    this.brand = props.brand;
    this.model = props.model;
    this.version = props.version;
    this.year = props.year;
    this.fipePrice = props.fipePrice;
    this.consumption = props.consumption;
    this.insurance = props.insurance;
    this.imageUrl = props.imageUrl;
  }
}
