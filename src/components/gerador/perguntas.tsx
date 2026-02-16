"use client";

export default function Perguntas({
  pergunta,
  tipo,
  options,
  inputValue,
  setInputValue,
  handleResposta,
  voltarPergunta,
  podeVoltar,
}: {
  pergunta: string;
  tipo: "text" | "textarea" | "select";
  options?: string[];
  inputValue: string;
  setInputValue: (v: string) => void;
  handleResposta: (v: string) => void;
  voltarPergunta: () => void;
  podeVoltar: boolean;
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !(tipo === "textarea" && !e.shiftKey)) {
      e.preventDefault();
      handleResposta(inputValue);
    }
  };

  return (
    <>
      <p className="text-lg font-medium mb-2">{pergunta}</p>

      {tipo === "textarea" && (
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 rounded-lg bg-stone-700 border border-stone-600 focus:ring-2 focus:ring-blue-500 outline-none h-28 resize-none"
          autoFocus
        />
      )}

      {tipo === "text" && (
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full p-3 rounded-lg bg-stone-700 border border-stone-600 focus:ring-2 focus:ring-blue-500 outline-none"
          autoFocus
        />
      )}

      {tipo === "select" && (
        <select
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            handleResposta(e.target.value);
          }}
          className="w-full p-3 rounded-lg bg-stone-700 border border-stone-600 focus:ring-2 focus:ring-blue-500 outline-none"
          autoFocus
        >
          <option value="">Selecione...</option>

          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      )}

      <div className="flex justify-between items-center mt-3">
        {podeVoltar && (
          <button
            onClick={voltarPergunta}
            className="bg-stone-600 hover:bg-stone-500 text-white text-sm px-3 py-1.5 rounded-lg shadow transition"
          >
            ⬅ Voltar
          </button>
        )}
        <button
          onClick={() => handleResposta(inputValue)}
          className="bg-green-800 hover:bg-green-900 text-white text-sm px-3 py-1.5 rounded-lg shadow transition"
        >
          Seguinte ➡
        </button>
      </div>
    </>
  );
}
