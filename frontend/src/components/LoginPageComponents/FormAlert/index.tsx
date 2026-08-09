interface FormAlertProps {
  message: string;
  variant: "success" | "error";
}

export const FormAlert = ({ message, variant }: FormAlertProps) => {
  const styles =
    variant === "success"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";

  return (
    <div className={`mb-4 p-3 text-sm rounded-lg ${styles}`}>{message}</div>
  );
};
