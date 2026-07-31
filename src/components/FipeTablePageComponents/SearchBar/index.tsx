import { AiOutlineSearch } from "react-icons/ai";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  brand: string;
  onBrandChange: (value: string) => void;
  model: string;
  onModelChange: (value: string) => void;
  year: string;
  onYearChange: (value: string) => void;
  brandOptions: string[];
  modelOptions: string[];
  yearOptions: string[];
}

export const SearchBar = ({
  searchTerm,
  onSearchChange,
  brand,
  onBrandChange,
  model,
  onModelChange,
  year,
  onYearChange,
  brandOptions,
  modelOptions,
  yearOptions,
}: SearchBarProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-8">
      {/* Search input */}
      <div className="relative flex-1">
        <AiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
        <input
          id="fipe-search"
          type="text"
          placeholder="Buscar veículo (Ex: Corolla 2023)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      </div>

      {/* Filter dropdowns */}
      <div className="flex gap-3">
        <select
          id="fipe-brand-filter"
          value={brand}
          onChange={(e) => onBrandChange(e.target.value)}
          className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Marca</option>
          {brandOptions.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>

        <select
          id="fipe-model-filter"
          value={model}
          onChange={(e) => onModelChange(e.target.value)}
          className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Modelo</option>
          {modelOptions.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>

        <select
          id="fipe-year-filter"
          value={year}
          onChange={(e) => onYearChange(e.target.value)}
          className="px-3 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Ano</option>
          {yearOptions.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
