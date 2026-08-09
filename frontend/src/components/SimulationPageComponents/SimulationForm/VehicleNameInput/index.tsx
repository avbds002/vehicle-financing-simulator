interface VehicleNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const VehicleNameInput = ({
  value,
  onChange,
}: VehicleNameInputProps) => {
  return (
    <div className="mb-4">
      <label
        className="block font-semibold text-sm uppercase mb-1"
        htmlFor="vehicleName"
      >
        Nome e Modelo do Veículo
      </label>
      <input
        type="text"
        className="border rounded p-2 w-full font-semibold"
        name="vehicleName"
        id="vehicleName"
        value={value}
        placeholder="Ex: Honda Civic EXL 2024"
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
