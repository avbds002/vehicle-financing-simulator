import { useState, useMemo } from "react";
import { SearchBar } from "../components/VehicleTablePageComponents/SearchBar";
import { VehicleGrid } from "../components/VehicleTablePageComponents/VehicleGrid";
import { mockVehicles } from "../utils/mockVehicles";

export const VehicleTablePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");

  // Derive unique filter options from the data
  const brandOptions = useMemo(
    () => [...new Set(mockVehicles.map((c) => c.name.split(" ")[0]))],
    [],
  );

  const modelOptions = useMemo(
    () => [...new Set(mockVehicles.map((c) => c.name.split(" ")[1]))],
    [],
  );

  const yearOptions = useMemo(
    () => [...new Set(mockVehicles.map((c) => c.year))],
    [],
  );

  // Filter logic
  const filteredCars = useMemo(() => {
    return mockVehicles.filter((car) => {
      const fullText = `${car.name} ${car.version} ${car.year}`.toLowerCase();
      const matchesSearch = searchTerm
        ? fullText.includes(searchTerm.toLowerCase())
        : true;
      const matchesBrand = brand ? car.name.startsWith(brand) : true;
      const matchesModel = model ? car.name.includes(model) : true;
      const matchesYear = year ? car.year === year : true;

      return matchesSearch && matchesBrand && matchesModel && matchesYear;
    });
  }, [searchTerm, brand, model, year]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:p-12">
      <h2 className="text-blue-950 font-bold text-2xl sm:text-3xl mb-6">
        Tabela de veículos
      </h2>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        brand={brand}
        onBrandChange={setBrand}
        model={model}
        onModelChange={setModel}
        year={year}
        onYearChange={setYear}
        brandOptions={brandOptions}
        modelOptions={modelOptions}
        yearOptions={yearOptions}
      />

      <VehicleGrid cars={filteredCars} />
    </main>
  );
};
