"use client";
import { Etapa } from "./inicio";

export default function EtapasIniciais({ setEtapa }: { setEtapa: (etapa: Etapa) => void }) {
  return (
    <>
      <p className="text-lg">👋 Olá! Escolha o tipo de carimbo:</p>
      <div className="flex gap-4">
        <button onClick={() => setEtapa("provisionamento")} className="bg-blue-600 px-4 py-2 rounded">
          Provisionamento
        </button>
        <button onClick={() => setEtapa("reparo")} className="bg-yellow-600 px-4 py-2 rounded">
          Reparo
        </button>
      </div>
    </>
  );
}
