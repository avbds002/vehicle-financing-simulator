interface SubmitButtonProps {
  label: string;
}

export const SubmitButton = ({ label }: SubmitButtonProps) => {
  return (
    <div className="flex items-center justify-center p-2">
      <button
        type="submit"
        className="p-4 bg-emerald-500 rounded-2xl w-full font-bold text-white text-shadow-2xl uppercase"
      >
        {label}
      </button>
    </div>
  );
};
