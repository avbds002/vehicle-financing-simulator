import { BsFuelPump } from "react-icons/bs";
import { MdOutlineVerifiedUser } from "react-icons/md";
import type { FipeCar } from "../../../types";

interface VehicleCardProps {
  car: FipeCar;
}

export const VehicleCard = ({ car }: VehicleCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-slate-100 flex flex-col">
      {/* Vehicle image */}
      <div className="relative bg-slate-50 h-48 flex items-center justify-center overflow-hidden">
        <img
          src={car.image}
          alt={`${car.name} ${car.version}`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1">
        {/* Name and version */}
        <h3 className="text-slate-800 font-bold text-lg leading-tight">
          {car.name}
        </h3>
        <p className="text-slate-500 text-sm mb-2">{car.version}</p>

        {/* Year badge */}
        <span className="inline-block w-fit bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3">
          {car.year}
        </span>

        {/* FIPE Price */}
        <p className="text-blue-600 font-extrabold text-xl mb-4">
          {car.fipePrice}
        </p>

        {/* Statistics */}
        <div className="mt-auto flex items-center gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <BsFuelPump className="text-blue-500 text-sm" />
            <span>
              Consumo: <strong className="text-slate-700">{car.consumption}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <MdOutlineVerifiedUser className="text-blue-500 text-sm" />
            <span>
              Seguro: <strong className="text-slate-700">{car.insurance}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
