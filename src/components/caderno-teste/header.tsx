export default function CadernoTesteHeader({
  total,
  concluidos,
}: {
  total: number;
  concluidos: number;
}) {
  const progresso = concluidos / total;

  return (
    <h2 className="text-lg font-bold mb-4 text-center">
      Caderno de testes{" "}
      <span
        className="px-2 py-1 rounded-lg shadow-md text-white"
        style={{
          backgroundColor: `hsl(${progresso * 120}, 70%, 40%)`,
        }}
      >
        {concluidos} / {total}
      </span>
    </h2>
  );
}
