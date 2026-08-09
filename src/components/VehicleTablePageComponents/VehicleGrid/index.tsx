import type { FipeCar } from "../../../types";
import { VehicleCard } from "../VehicleCard";

interface VehicleGridProps {
  cars: FipeCar[];
}

export const VehicleGrid = ({ cars }: VehicleGridProps) => {
  if (cars.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500 text-lg">
          Nenhum veículo encontrado para os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 min-[912px]:grid-cols-2 xl:grid-cols-4 gap-6">
      {cars.map((car) => (
        <VehicleCard key={car.id} car={car} />
      ))}
    </div>
  );
};
