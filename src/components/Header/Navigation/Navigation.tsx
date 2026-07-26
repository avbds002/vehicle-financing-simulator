import { Link } from "react-router-dom";
import { LoginButton } from "../LoginButton";

export const Navigation = () => {
  return (
    <nav>
      <ul className="flex flex-wrap items-center gap-2 sm:gap-4 p-2 sm:p-4">
        <li>
          <Link
            to="/"
            className="text-blue-600 font-semibold text-lg sm:text-2xl text-shadow-md"
          >
            SIMULAR
          </Link>
        </li>
        <li>
          <Link
            to="/fipe"
            className="text-blue-600 font-semibold text-lg sm:text-2xl text-shadow-md"
          >
            TABELA FIPE
          </Link>
        </li>
        <li>
          <Link
            to="/loan-book-page"
            className="text-blue-600 font-semibold text-lg sm:text-2xl text-shadow-md"
          >
            FINANCIAMENTOS
          </Link>
        </li>
        <li>
          <LoginButton />
        </li>
      </ul>
    </nav>
  );
};
