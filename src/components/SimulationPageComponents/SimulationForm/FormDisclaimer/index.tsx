import { IoIosWarning } from "react-icons/io";

export const FormDisclaimer = () => {
  return (
    <div className="flex items-start p-4">
      <IoIosWarning className="text-2xl text-gray-500 m-2" />
      <p className="text-xs tracking-tight text-gray-500">
        Esse aplicativo apenas tenta simular baseado nos parâmetros informados
        pelo usuário, caso queira valores mais próximos da realidade da sua
        região consulte uma concessionária próxima.
      </p>
    </div>
  );
};
