"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
  onAdd: () => void;
}

export function AddTechnicianModal({ onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (!name.trim()) {
      setError("Informe o nome do técnico");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/technicians", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        onAdd();
        onClose();
      } else {
        const json = await res.json();
        setError(json.error || "Erro ao adicionar técnico");
      }
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#1a1a1a] p-6 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-bold mb-4">Adicionar Técnico</h2>
        <input
          type="text"
          className="w-full border border-slate-400 bg-transparent rounded-lg p-2 text-sm mb-3"
          placeholder="Nome do técnico"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg border border-slate-500 hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-3 py-1 bg-cyan-700 rounded-lg hover:bg-cyan-600 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
