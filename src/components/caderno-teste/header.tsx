interface Props {
  total: number;
  sucesso: number;
}

export default function CadernoTesteHeader({
  total,
  sucesso,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h1 className="text-3xl font-bold">
        Caderno de Testes
      </h1>

      <div className="bg-blue-600 transition-colors px-3 py-1 rounded-lg font-bold">
        {sucesso}/{total}
      </div>
    </div>
  );
}