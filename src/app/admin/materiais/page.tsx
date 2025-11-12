"use client";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Footer } from "@/components/footer";
import { AddTechnicianModal } from "@/components/AddTechnicianModal";

type MaterialResponse = {
  id: string;
  bd: string;
  clientName: string;
  technicianId: string;
  dropBatch?: string;
  createdAt: string;
  materials: { name: string; quantity: string }[];
  equipments: { model: string; serial: string }[];
  technician: { id: string; name: string; createdAt: string };
  strap: number;
  fiber: number;
  internalConnector: number;
  externalConnector: number;
};

export default function Supervisao() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("data");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<MaterialResponse[]>([]);
  const [showModal, setShowModal] = useState(false);

  const handleAddTech = async () => {
    alert("Técnico adicionado com sucesso!");
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/materiais");
        const json = await res.json();
        setData(json.materialList || []);
      } catch (error) {
        console.error("Erro ao buscar materiais:", error);
      }
    })();
  }, []);

  // Configuração do Fuse.js (busca)
  const fuse = useMemo(() => {
    if (!data) return null;
    return new Fuse(data, {
      keys: ["technician.name", "clientName", "bd", "dropBatch"],
      threshold: 0.3,
    });
  }, [data]);

  const resultados = query && fuse ? fuse.search(query).map((r) => r.item) : data;

  // Ordenação
  const ordenados = [...(resultados || [])].sort((a, b) => {
    if (sortBy === "data") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortBy === "bd") return a.bd.localeCompare(b.bd);
    if (sortBy === "tecnico") return a.technician.name.localeCompare(b.technician.name);
    return 0;
  });

  // Paginação
  const totalPages = Math.ceil(ordenados.length / rowsPerPage);
  const exibidos = ordenados.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-6xl shadow-lg flex flex-col">
          <h1 className="text-2xl font-bold text-center mb-4">Supervisão de BD</h1>

          {/* Barra de busca e filtros */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Buscar técnico, cliente, BD, lote..."
              className="bg-transparent border border-slate-400 rounded-lg px-3 py-2 text-sm w-full sm:w-1/2"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />

            <div className="flex gap-3 flex-col sm:flex-row">
              <button
                onClick={() => setShowModal(true)}
                className="bg-transparent border border-slate-400 rounded-lg px-2 py-2 text-sm cursor-pointer"
              >
                Adicionar técnico
              </button>

              <select
                className="bg-[#1a1a1a] border border-slate-400 rounded-lg px-2 py-2 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="data">Ordenar por Data</option>
                <option value="bd">Ordenar por BD</option>
                <option value="tecnico">Ordenar por Técnico</option>
              </select>

              <select
                className="bg-[#1a1a1a] border border-slate-400 rounded-lg px-2 py-2 text-sm"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={10}>10 por página</option>
                <option value={20}>20 por página</option>
                <option value={50}>50 por página</option>
              </select>
            </div>
          </div>

          {/* Tabela resumida */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-slate-800 text-left">
                  <th className="p-2">Técnico</th>
                  <th className="p-2">Cliente</th>
                  <th className="p-2">BD</th>
                  <th className="p-2">Lote</th>
                  <th className="p-2">Data</th>
                </tr>
              </thead>
              <tbody>
                {exibidos.map((item) => (
                  <tr key={item.id} onClick={() => {window.location.href = `/admin/materiais/${item.id}`}} className="border-t border-slate-700 hover:bg-slate-800/50 cursor-pointer">
                    <td className="p-2">{item.technician.name}</td>
                    <td className="p-2">{item.clientName}</td>
                    <td className="p-2">{item.bd}</td>
                    <td className="p-2">{item.dropBatch || "-"}</td>
                    <td className="p-2">{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <span>
              Página {page} de {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-cyan-700 rounded-lg hover:bg-cyan-600 disabled:opacity-50"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Anterior
              </button>
              <button
                className="px-3 py-1 bg-cyan-700 rounded-lg hover:bg-cyan-600 disabled:opacity-50"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <AddTechnicianModal onClose={() => setShowModal(false)} onAdd={handleAddTech} />}

      <Footer />
    </main>
  );
}
