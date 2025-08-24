"use client";
import { useState, useEffect } from "react";
import { Footer } from "@/components/footer";
import CadernoTesteHeader from "./header";
import CadernoTesteLista from "./lista";
import { numeros } from "./dados";
import { loadItem, saveItem, clearStore } from "@/helpers/indexedDB";

const DB_NAME = "CadernoTesteDB";
const STORE_NAME = "checados";
const ITEM_ID = 1;

export default function CadernoTesteContainer() {
  const [checados, setChecados] = useState<number[]>([]);

  // Carregar os checkboxes salvos ao iniciar
  useEffect(() => {
    loadItem<number[]>(DB_NAME, STORE_NAME, ITEM_ID).then((data) => {
      if (data) setChecados(data);
    });
  }, []);

  const toggleCheck = (index: number) => {
    const newChecados = checados.includes(index)
      ? checados.filter((i) => i !== index)
      : [...checados, index];
    setChecados(newChecados);
    saveItem(DB_NAME, STORE_NAME, ITEM_ID, newChecados);
  };

  const resetar = async () => {
    setChecados([]);
    await clearStore(DB_NAME, STORE_NAME);
  };

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
      <div className="flex flex-col items-center justify-center flex-1 w-full max-w-lg">
        <div className="bg-[#1a1a1a] rounded-xl p-6 w-full shadow-lg">
          <CadernoTesteHeader total={numeros.length} concluidos={checados.length} />
          <CadernoTesteLista numeros={numeros} checados={checados} toggleCheck={toggleCheck} />

          <div
            className="w-full mt-3 rounded-lg shadow-md text-white text-center"
            style={{
              backgroundColor: `hsl(${(checados.length / numeros.length) * 120}, 70%, 40%)`,
            }}
          >
            {checados.length} / {numeros.length}
          </div>

          <button
            onClick={resetar}
            className="mt-4 w-full bg-amber-400 text-white py-2 rounded shadow-md hover:bg-amber-600 transition"
          >
            Resetar checkboxes
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
