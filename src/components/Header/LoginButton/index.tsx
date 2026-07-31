import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { useAuth } from "../../../hooks/useAuth";

export const LoginButton = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert("Você foi desconectado com sucesso!");
    navigate("/");
  };

  if (isAuthenticated) {
    const username = sessionStorage.getItem("user") ?? "";

    return (
      <div className="flex items-center gap-2 text-blue-600 font-semibold">
        <span>USUARIO: {username}</span>
        <button
          onClick={handleLogout}
          title="Sair"
          className="text-red-600 hover:text-red-300 transition-colors cursor-pointer text-xl"
        >
          <AiOutlineLogout />
        </button>
      </div>
    );
  }

  return (
    <Link
      to="/login"
      className="text-white font-semibold bg-emerald-500 rounded p-2 w-28 inline-block text-center"
    >
      LOGIN
    </Link>
  );
};
