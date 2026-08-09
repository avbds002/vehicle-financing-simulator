interface FormFooterLinkProps {
  text: string;
  linkText: string;
  onClick: () => void;
}

export const FormFooterLink = ({
  text,
  linkText,
  onClick,
}: FormFooterLinkProps) => {
  return (
    <p className="text-center text-sm text-slate-600 mt-4">
      {text}{" "}
      <button
        type="button"
        onClick={onClick}
        className="text-blue-700 hover:text-blue-900 font-semibold underline cursor-pointer"
      >
        {linkText}
      </button>
    </p>
  );
};
