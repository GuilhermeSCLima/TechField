"use client";

import { useState, useEffect } from "react";
import { Footer } from "@/components/footer";

type ItemType = "Material" | "Equipamento";

interface Item {
  id: string;
  type: ItemType;
  name: string;
  quantity: string;
  serial?: string;
}

interface Technician {
  id: string;
  name: string;
}

export default function UsedMaterialsForm() {
  const [items, setItems] = useState<Item[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<ItemType>("Material");
  const [currentName, setCurrentName] = useState("");
  const [currentQuantity, setCurrentQuantity] = useState("1x");
  const [currentSerial, setCurrentSerial] = useState("");
  const [technicians, setTechnicians] = useState<Technician[]>([])

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/technicians")
      const json = await res.json();
      setTechnicians(json.technicians || [])
    })()
  }, [])

  const openModal = (type: ItemType) => {
    setModalType(type);
    setCurrentName("");
    setCurrentQuantity(type === "Equipamento" ? "1x" : "");
    setCurrentSerial("");
    setModalOpen(true);
  };

  const addItem = () => {
    if (!currentName) return;

    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        type: modalType,
        name: currentName,
        quantity: modalType === "Equipamento" ? "1x" : currentQuantity,
        serial: modalType === "Equipamento" ? currentSerial : undefined,
      },
    ]);
    setModalOpen(false);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const btn = document.querySelector("button#listSave") as HTMLButtonElement;

    btn.setAttribute("disabled","true")

    e.preventDefault();

    const technicianId = (document.getElementById("technician") as HTMLSelectElement).value;
    const client = (document.getElementById("client") as HTMLInputElement).value;
    const bd = (document.getElementById("bd") as HTMLInputElement).value;
    const dropBatch = (document.getElementById("dropBatch") as HTMLInputElement).value;
    const strap = (document.getElementById("strap") as HTMLInputElement).value;
    const fiber = (document.getElementById("fiber") as HTMLInputElement).value;
    const internalConnector = (document.getElementById("internalConnector") as HTMLInputElement).value;
    const externalConnector = (document.getElementById("externalConnector") as HTMLInputElement).value;

    if (!technicianId || !client || !bd) {
      alert("Preencha Técnico, Cliente e BD!");
      return;
    }

    const payload = {
      bd,
      clientName: client,
      technicianId,
      dropBatch,
      materials: items.filter(i => i.type === "Material"),
      equipments: items.filter(i => i.type === "Equipamento"),
      strap: strap || 0,
      fiber: fiber || 0,
      internalConnector: internalConnector || 0,
      externalConnector: externalConnector || 0
    };

    try {
      const res = await fetch("/api/materiais", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Materiais utilizados salvos com sucesso!");
        setItems([]);
      } else {
        alert("Erro ao salvar materiais!");
      }
      btn.removeAttribute("disabled");
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar materiais!");
      btn.removeAttribute("disabled");
    }
  };

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
      <div className="flex flex-col items-center justify-center flex-1">
        <form
          className="bg-[#1a1a1a] rounded-xl p-6 w-96 shadow-lg flex flex-col gap-4"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-bold mb-4 text-center">Lista de materiais utilizados</h1>

          <div className="flex flex-col gap-3">
            <label className="font-medium">Técnico:</label>
            <select className="w-full mt-1 bg-transparent text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300" name="technician" id="technician">
              <option className="bg-[#1a1a1a] text-slate-400" value="" disabled>-------- Técnicos --------</option>
              {technicians.map((tech) => (
                <option className="bg-[#1a1a1a] text-slate-400" key={tech.id} value={tech.id}>{tech.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium">Cliente:</label>
            <input
              id="client"
              className="w-full mt-1 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
              placeholder="Nome do cliente"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium">BD:</label>
            <input
              id="bd"
              className="w-full mt-1 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
              placeholder="Número da BD"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium">Quantidade de fibra: <span className="text-sm italic">(Metros)</span></label>
            <input
              id="fiber"
              type="number"
              className="w-full mt-1 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
              placeholder="100"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="font-medium">Cunhas:</label>
            <input
              id="strap"
              type="number"
              className="w-full mt-1 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
              placeholder="5"
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <label className="font-medium">Conectores:</label>
            <input
              id="internalConnector"
              type="number"
              className="w-full mt-1 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
              placeholder="Conector interno"
            />
            <input
              id="externalConnector"
              type="number"
              className="w-full mt-1 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
              placeholder="Conector externo"
            />
          </div>
          
          <div className="flex flex-col gap-3">
            <label className="font-medium">Lote do drop: <span className="text-sm italic">(Opicional)</span></label>
            <input
              id="dropBatch"
              className="w-full mt-1 bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
              placeholder="Lote do drop"
            />
          </div>

          <div className="flex gap-2 my-2">
            <button
              type="button"
              className="bg-cyan-700 px-4 py-2 rounded-2xl shadow-sm shadow-cyan-900 hover:shadow-lg"
              onClick={() => openModal("Material")}
            >
              Adicionar Material
            </button>
            <button
              type="button"
              className="bg-cyan-700 px-4 py-2 rounded-2xl shadow-sm shadow-cyan-900 hover:shadow-lg"
              onClick={() => openModal("Equipamento")}
            >
              Adicionar Equipamento
            </button>
          </div>

          <div className="mt-4">
            <span className="font-medium">Materiais adicionados:</span>
            <div className="overflow-x-auto">
              {items.length > 0 ? (
                <table className="min-w-full max-w-full text-sm mt-2 border border-slate-700">
                  <thead>
                    <tr className="bg-slate-800">
                      <th className="p-2 border border-slate-700">Nome</th>
                      <th className="p-2 border border-slate-700">Quantidade</th>
                      <th className="p-2 border border-slate-700">Serial</th>
                      <th className="p-2 border border-slate-700">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="text-center border border-slate-700">
                        <td className="p-2">{item.name}</td>
                        <td className="p-2">{item.quantity}</td>
                        <td className="p-2">{item.serial || "-"}</td>
                        <td className="p-2">
                          <button
                            className="text-red-500 hover:underline"
                            type="button"
                            onClick={() => removeItem(item.id)}
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-2 text-slate-400">Nenhum material ou equipamento adicionado ainda.</p>
              )}
            </div>
          </div>

          <button
            id="listSave"
            type="submit"
            className="bg-green-600 px-6 py-2 mt-4 rounded-2xl shadow-sm shadow-green-900 hover:shadow-lg"
          >
            Salvar Lista
          </button>
        </form>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[#1a1a1a] p-6 rounded-xl w-80 shadow-lg">
            <h2 className="text-lg font-bold mb-4">Adicionar {modalType}</h2>
            <div className="flex flex-col gap-3">
              <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
                placeholder={`Nome do ${modalType.toLowerCase()}`}
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
              />
              {modalType === "Material" && (
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
                  placeholder="Quantidade (ex: 5x, 50m)"
                  value={currentQuantity}
                  onChange={(e) => setCurrentQuantity(e.target.value)}
                />
              )}
              {modalType === "Equipamento" && (
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-100 text-sm border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:border-slate-50 hover:border-slate-300"
                  placeholder="Serial do equipamento"
                  value={currentSerial}
                  onChange={(e) => setCurrentSerial(e.target.value)}
                />
              )}
              <div className="flex justify-end gap-2 mt-2">
                <button
                  className="px-4 py-2 rounded-xl bg-gray-700 hover:bg-gray-600"
                  type="button"
                  onClick={() => setModalOpen(false)}
                >
                  Cancelar
                </button>
                <button
                  className="px-4 py-2 rounded-xl bg-cyan-700 hover:bg-cyan-600"
                  type="button"
                  onClick={addItem}
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
