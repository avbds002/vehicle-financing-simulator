import { useRef } from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface VehiclePhotoInputProps {
  previewUrl: string;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
}

export const VehiclePhotoInput = ({
  previewUrl,
  onFileSelect,
  onRemove,
}: VehiclePhotoInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleRemove = () => {
    onRemove();
    // Reset file input so the same file can be re-selected
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="mb-4">
      <label
        className="block font-semibold text-sm uppercase mb-1"
        htmlFor="vehiclePhoto"
      >
        Foto do Veículo
      </label>
      <input
        ref={fileInputRef}
        type="file"
        className="border rounded p-2 w-full font-semibold text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        name="vehiclePhoto"
        id="vehiclePhoto"
        accept="image/*"
        onChange={handleChange}
      />
      {previewUrl && (
        <div className="relative mt-3 inline-block">
          <img
            src={previewUrl}
            alt="Prévia do veículo"
            className="max-h-40 rounded-lg border shadow-sm object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 text-red-500 bg-white rounded-full shadow hover:text-red-700 transition-colors cursor-pointer"
            aria-label="Remover foto"
          >
            <IoMdCloseCircle className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
};
