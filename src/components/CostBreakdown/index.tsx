export const CostBreakdown = () => {
  return (
    <div className="w-full border-none rounded-2xl shadow-2xl bg-white grid lg:grid-cols-2">
      <div className="flex flex-col items-start gap-4 p-4">
        <p className="text-blue-950 font-bold text-xl text-shadow-md">
          RODA DE CUSTOS
        </p>
        <div>espaço roda de custos</div>
        <div>
          <div className="flex gap-6">
            <p>Total a pagar: </p>
            <p> R$ 88.000,00</p>
          </div>
          <div className="flex gap-6">
            <p>Total de juros: </p>
            <p> R$ 29.000,00</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 p-4">
        <p className="text-blue-950 font-bold text-xl text-shadow-md">
          RESUMO DO PLANO
        </p>
        <div className="flex gap-6">
          <p>Parcelas: </p>
          <p> 48x</p>
        </div>
        <div className="flex gap-6">
          <p>Carência: </p>
          <p> 30 dias</p>
        </div>
        <div className="flex gap-6">
          <p>Total do financiamento: </p>
          <p> R$ 60.000,0</p>
        </div>
        <div className="flex gap-6">
          <p>Valor total pago: </p>
          <p> R$ 88.000,00</p>
        </div>
      </div>
    </div>
  );
};
