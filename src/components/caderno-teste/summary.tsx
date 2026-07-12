interface Props {
  total: number;
  sucesso: number;
  falha: number;
  resetar: () => void;
}

export default function CadernoTesteSummary({
  total,
  sucesso,
  falha,
  resetar,
}: Props) {
  return (
    <aside className="bg-background rounded-2xl p-5 h-fit">
      <h2 className="text-xl font-bold mb-5">
        Resumo
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Total</span>
          <span>{total}</span>
        </div>

        <div className="flex justify-between">
          <span>Concluídos</span>
          <span>{sucesso}</span>
        </div>

        <div className="flex justify-between">
          <span>Falhas</span>
          <span>{falha}</span>
        </div>

        <div className="flex justify-between">
          <span>Pendentes</span>
          <span>{total - sucesso - falha}</span>
        </div>
      </div>

      <button
        onClick={resetar}
        className="
          w-full
          mt-6
          bg-blue-500 
          hover:bg-blue-600
          rounded-xl
          py-2
          font-medium
          transition-colors
        "
      >
        Resetar
      </button>
    </aside>
  );
}