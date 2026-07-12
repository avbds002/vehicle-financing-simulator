export const MonthlyPaymentCard = () => {
  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white">
      <div className="flex flex-col items-center justify-center gap-4 p-6">
        <h4 className="text-blue-950 font-semibold text-xl text-shadow-md">
          SUA PARCELA MENSAL
        </h4>
        <p className="text-blue-950 font-bold text-6xl text-shadow-md">
          R$ 1.845,72
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 p-6">
        <div>
          <p className="text-blue-950 text-sm">TOTAL DO FINANCIAMENTO:</p>
          <p className="text-blue-950 font-bold text-xl text-shadow-md">
            R$ 60.000,00
          </p>
        </div>
        <div>
          <p className="text-blue-950 text-sm">TAXA DE JUROS:</p>
          <p className="text-blue-950 font-bold text-xl text-shadow-md">
            1.25% A.M.
          </p>
        </div>
        <div>
          <p className="text-blue-950 text-sm">CET ANUAL:</p>
          <p className="text-blue-950 font-bold text-xl text-shadow-md">
            16.5%
          </p>
        </div>
      </div>
    </div>
  );
};
