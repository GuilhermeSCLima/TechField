"use client";

import { useState } from "react";

interface Props {
  onClose: () => void;
}

export function ExportSpreadsheet({ onClose }: Props) {
  const [mode, setMode] = useState<"all" | "period">("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit() {
    if (mode === "period" && (!startDate || !endDate)) {
      setError("Informe o período completo");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/materiais/export", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          startDate,
          endDate,
        }),
      });

      if (!res.ok) {
        const json = await res.json();
        setError(json.error || "Erro ao exportar planilha");
        return;
      }

      // Baixar o arquivo
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "materiais.xlsx";
      a.click();

      onClose();
    } catch {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
      <div className="bg-[#1a1a1a] p-6 rounded-lg w-full max-w-sm shadow-lg">
        <h2 className="text-lg font-bold mb-4">Exportar Planilha</h2>

        <div className="mb-4 space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="mode"
              value="all"
              checked={mode === "all"}
              onChange={() => setMode("all")}
            />
            Exportação completa
          </label>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="mode"
              value="period"
              checked={mode === "period"}
              onChange={() => setMode("period")}
            />
            Exportar por período
          </label>
        </div>

        {mode === "period" && (
          <div className="mb-4 space-y-2">
            <input
              type="date"
              className="w-full border border-slate-400 bg-transparent rounded-lg p-2 text-sm text-white [&::-webkit-calendar-picker-indicator]:invert"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="w-full border border-slate-400 bg-transparent rounded-lg p-2 text-sm text-white [&::-webkit-calendar-picker-indicator]:invert"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        )}

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
            {loading ? "Exportando..." : "Exportar"}
          </button>
        </div>
      </div>
    </div>
  );
}
