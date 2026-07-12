"use client";

import { useEffect, useState } from "react";

import CadernoTesteHeader from "./header";
import CadernoTesteLista from "./lista";
import CadernoTesteSummary from "./summary";

import { numeros } from "./dados";

import {
  clearStore,
  loadItem,
  saveItem,
} from "@/helpers/indexedDB";

type Status = "pendente" | "sucesso" | "falha";

const DB_NAME = "CadernoTesteDB";
const STORE_NAME = "status";
const ITEM_ID = 1;

export default function CadernoTesteContainer() {
  const [status, setStatus] = useState<
    Record<number, Status>
  >({});

  useEffect(() => {
    loadItem<Record<number, Status>>(
      DB_NAME,
      STORE_NAME,
      ITEM_ID
    ).then((data) => {
      if (data) setStatus(data);
    });
  }, []);

  const salvar = (
    novoStatus: Record<number, Status>
  ) => {
    setStatus(novoStatus);
    saveItem(
      DB_NAME,
      STORE_NAME,
      ITEM_ID,
      novoStatus
    );
  };

  const marcarSucesso = (index: number) => {
    salvar({
      ...status,
      [index]: "sucesso",
    });
  };

  const marcarFalha = (index: number) => {
    salvar({
      ...status,
      [index]: "falha",
    });
  };

  const resetar = async () => {
    setStatus({});
    await clearStore(DB_NAME, STORE_NAME);
  };

  const sucesso = Object.values(status).filter(
    (s) => s === "sucesso"
  ).length;

  const falha = Object.values(status).filter(
    (s) => s === "falha"
  ).length;

  return (
    <div className="h-full flex flex-col">
      <CadernoTesteHeader
        total={numeros.length}
        sucesso={sucesso}
      />

      <div className="flex-1 grid grid-cols-[1fr_280px] gap-6 overflow-hidden">
        <div className="overflow-y-auto pr-2">
          <CadernoTesteLista
            numeros={numeros}
            status={status}
            onSuccess={marcarSucesso}
            onFail={marcarFalha}
          />
        </div>

        <CadernoTesteSummary
          total={numeros.length}
          sucesso={sucesso}
          falha={falha}
          resetar={resetar}
        />
      </div>
    </div>
  );
}