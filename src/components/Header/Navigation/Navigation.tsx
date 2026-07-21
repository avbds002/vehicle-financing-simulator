import { LoginButton } from "../LoginButton";

export const Navigation = () => {
  return (
    <nav>
      <ul className="flex flex-wrap items-center gap-2 sm:gap-4 p-2 sm:p-4">
        <li>
          <a
            href="#simular"
            className="text-blue-600 font-semibold text-lg sm:text-2xl text-shadow-md"
          >
            SIMULAR
          </a>
        </li>
        <li>
          <a
            href="#fipe"
            className="text-blue-600 font-semibold text-lg sm:text-2xl text-shadow-md"
          >
            TABELA FIPE
          </a>
        </li>
        <li>
          <LoginButton />
        </li>
      </ul>
    </nav>
  );
};
