const Navigation = () => {
  return (
    <ul className="flex flex-wrap items-center gap-2 sm:gap-4 p-2 sm:p-4">
      <li className="text-blue-600 font-semibold text-lg sm:text-2xl text-shadow-md">
        SIMULAR
      </li>
      <li className="text-blue-600 font-semibold text-lg sm:text-2xl text-shadow-md">
        FAQ
      </li>
      <button className="text-white font-semibold bg-emerald-500 rounded p-2 w-28">
        LOGIN
      </button>
    </ul>
  );
};

export default Navigation;
