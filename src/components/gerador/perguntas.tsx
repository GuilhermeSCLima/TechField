"use client";

export default function Perguntas({
  pergunta,
  inputValue,
  setInputValue,
  handleResposta,
}: {
  pergunta: string;
  inputValue: string;
  setInputValue: (v: string) => void;
  handleResposta: (v: string) => void;
}) {
  return (
    <>
      <p className="text-lg">{pergunta}</p>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleResposta(inputValue);
          }
        }}
        className="w-full p-2 rounded bg-stone-700 border border-stone-600"
        autoFocus
      />
      <p className="text-sm text-slate-400">Pressione Enter para continuar</p>
    </>
  );
}
