import { Link } from "react-router-dom";
import { LoginButton } from "../LoginButton";

interface NavigationProps {
  variant?: "desktop" | "mobile";
}

export const Navigation = ({ variant = "desktop" }: NavigationProps) => {
  const isMobile = variant === "mobile";

  return (
    <nav>
      <ul
        className={
          isMobile
            ? "flex flex-col items-stretch gap-1 px-4 pb-4 pt-2 border-t border-slate-200"
            : "flex flex-wrap items-center gap-4 p-4"
        }
      >
        <li>
          <Link
            to="/"
            className={
              isMobile
                ? "block text-blue-600 font-semibold text-lg py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                : "text-blue-600 font-semibold text-2xl text-shadow-md"
            }
          >
            SIMULAR
          </Link>
        </li>
        <li>
          <Link
            to="/fipe"
            className={
              isMobile
                ? "block text-blue-600 font-semibold text-lg py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                : "text-blue-600 font-semibold text-2xl text-shadow-md"
            }
          >
            TABELA FIPE
          </Link>
        </li>
        <li>
          <Link
            to="/loan-book-page"
            className={
              isMobile
                ? "block text-blue-600 font-semibold text-lg py-2 px-2 rounded hover:bg-blue-50 transition-colors"
                : "text-blue-600 font-semibold text-2xl text-shadow-md"
            }
          >
            FINANCIAMENTOS
          </Link>
        </li>
        <li className={isMobile ? "pt-1" : ""}>
          <LoginButton />
        </li>
      </ul>
    </nav>
  );
};
