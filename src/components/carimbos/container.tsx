"use client";
import { useEffect, useState } from "react";
import { CarimboType, GetCarimbo } from './types'
import { FieldRenderer } from "./FieldRender";
import { Button } from "../ui/button";
import { Copy, Save, Trash2 } from "lucide-react";
import { useNotify } from "@/hooks/useNotify";

interface Props {
  carimboType: CarimboType
}

export default function CarimbosContainer({ carimboType }: Props) {
  const carimbo = GetCarimbo(carimboType)
  const [values, setValues] = useState<Record<string, string>>({});
  const resultado = carimbo.template(values);
  const { notify } = useNotify();
  const copiar = () => {
    navigator.clipboard.writeText(resultado);
    notify(
      "Copiado",
      "Carimbo copiado para a área de transferência",
      "info"
    );
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Header */}
      <div className="shrink-0 py-4">
        <h1 className="max-w-4xl text-center text-3xl lg:text-4xl font-bold leading-tight">
          Carimbo: <span className="italic font-normal">{carimbo.name}</span>
        </h1>
      </div>

      <div className="flex-1 min-h-0 grid lg:grid-cols-[420px_1fr] gap-6 mt-6">
        <div className="h-full bg-background min-h-0 rounded-xl p-6 flex flex-col gap-6 overflow-y-scroll">
          {carimbo.fields.map((field) => (
            <FieldRenderer
              key={field.label}
              field={field}
              value={values[field.name] ?? ""}
              onChange={(value) =>
                setValues(prev => ({
                  ...prev,
                  [field.name]: value
                }))
              }
            />
          ))}
        </div>

        <div className="flex flex-col h-full rounded-xl bg-background border overflow-hidden">

          <div className="border-b px-6 py-4">
            <h2 className="text-xl font-semibold">
              Resultado
            </h2>

            <p className="text-sm text-muted-foreground">
              O carimbo será atualizado automaticamente.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            <div className="whitespace-pre-wrap font-sans text-sm leading-7">
              {resultado}
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex justify-end gap-3">
              <Button onClick={copiar}>
                <Copy className="mr-2 h-4 w-4" />
                Copiar
              </Button>

              <Button variant="secondary" disabled>
                <Save className="mr-2 h-4 w-4" />
                Salvar
              </Button>

              <Button variant="destructive" onClick={() => setValues({})}>
                <Trash2 className="mr-2 h-4 w-4" />
                Limpar
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}