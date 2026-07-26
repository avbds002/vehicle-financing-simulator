import { Link } from "react-router-dom";

export const LoginButton = () => {
  return (
    <Link
      to="/login"
      className="text-white font-semibold bg-emerald-500 rounded p-2 w-28 inline-block text-center"
    >
      LOGIN
    </Link>
  );
};
