interface SubmitButtonProps {
  label: string;
}

export const SubmitButton = ({ label }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
    >
      {label}
    </button>
  );
};
