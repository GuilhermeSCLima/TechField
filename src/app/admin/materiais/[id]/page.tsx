"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";

type Material = {
  name: string;
  quantity: string;
};

type Equipment = {
  model: string;
  serial: string;
};

type UsedMaterial = {
  id: string;
  bd: string;
  clientName: string;
  technician: { id: string; name: string };
  dropBatch?: string;
  createdAt: string;
  materials: Material[];
  equipments: Equipment[];
  strap: number;
  fiber: number;
  internalConnector: number;
  externalConnector: number;
};

export default function Supervisao() {
  const params = useParams();
  const { id } = params;
  const [data, setData] = useState<UsedMaterial | null>(null);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const res = await fetch(`/api/materiais/${id}`);
        const json = await res.json();
        setData(json.material);
      } catch (err) {
        console.error("Erro ao buscar material:", err);
      }
    })();
  }, [id]);

  if (!data) return <p className="text-white text-center mt-10">Carregando...</p>;

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="bg-[#1a1a1a] rounded-xl p-6 w-full max-w-6xl shadow-lg flex flex-col">
          <h1 className="text-3xl text-center">Materiais utilizados na atividade:</h1>

          <ul className="mt-3 border-b border-b-gray-700 pb-3">
            <li className="italic">
              <span className="not-italic font-semibold">BD:</span> {data.bd}
            </li>
            <li className="italic">
              <span className="not-italic font-semibold">Técnico:</span> {data.technician.name}
            </li>
            <li className="italic">
              <span className="not-italic font-semibold">Cliente:</span> {data.clientName}
            </li>
            <li className="italic">
              <span className="not-italic font-semibold">Lote FO:</span> {data.dropBatch || "N/A"}
            </li>
          </ul>

          {/* MATERIAIS */}
          <div className="pb-3 border-b border-b-gray-700">
            <div className="overflow-x-auto">
             <ul>
              <li>{data.fiber || 0}m de fibra</li>
              <li>{data.strap || 0}x Cunhas</li>
              <li>{data.internalConnector || 0}x Conector interno</li>
              <li>{data.externalConnector || 0}x Conector externo</li>
             </ul>
            </div>
          </div>
          {/* MATERIAIS */}
          <div className="pb-3 border-b border-b-gray-700">
            <h2 className="text-2xl mb-2 mt-4 font-bold">Materiais</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full max-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-800 text-left">
                    <th className="p-2">Item</th>
                    <th className="p-2">Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {data.materials.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="p-2 text-center italic text-gray-400">
                        Nenhum material registrado
                      </td>
                    </tr>
                  ) : (
                    data.materials.map((m) => (
                      <tr
                        className="border-t border-slate-700 hover:bg-slate-800/50"
                        key={m.name}
                      >
                        <td className="p-2">{m.name}</td>
                        <td className="p-2">{m.quantity}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* EQUIPAMENTOS */}
          <div className="pb-3 border-b border-b-gray-700">
            <h2 className="text-2xl mb-2 mt-4 font-bold">Equipamentos</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-800 text-left">
                    <th className="p-2">Equipamento</th>
                    <th className="p-2">Serial</th>
                  </tr>
                </thead>
                <tbody>
                  {data.equipments.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="p-2 text-center italic text-gray-400">
                        Nenhum equipamento registrado
                      </td>
                    </tr>
                  ) : (
                    data.equipments.map((m) => (
                      <tr
                        className="border-t border-slate-700 hover:bg-slate-800/50"
                        key={m.model}
                      >
                        <td className="p-2">{m.model}</td>
                        <td className="p-2">{m.serial}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
