import { Check, Clipboard, X } from "lucide-react";
import { useNotify } from '@/hooks/useNotify';

type Status = "pendente" | "sucesso" | "falha";

interface Props {
  numeros: { text: string; num: string }[];
  status: Record<number, Status>;
  onSuccess: (index: number) => void;
  onFail: (index: number) => void;
}

export default function CadernoTesteLista({
  numeros,
  status,
  onSuccess,
  onFail,
}: Props) {
  const { notify } = useNotify();
  const copiarNumero = (numero: string) => {
    navigator.clipboard.writeText(numero.replace(" ", ""));
    notify(
      "Copiado",
      "O número foi copiado para a área de transferência",
      "info"
    );
  };

  return (
    <div className="space-y-3">
      {numeros.map((numero, index) => {
        const current = status[index];

        return (
          <div
            key={index}
            className={`
              flex items-center justify-between
              rounded-xl p-3 transition-colors
              ${
                current === "sucesso"
                  ? "bg-green-900"
                  : current === "falha"
                  ? "bg-red-900"
                  : "bg-background"
              }
            `}
          >
            <span className="font-medium">
              {numero.text}
            </span>

            <div className="flex gap-2">
              <button
                onClick={() => copiarNumero(numero.num)}
                className="p-2 rounded-lg hover:bg-black/20"
              >
                <Clipboard size={18} />
              </button>

              <button
                onClick={() => onSuccess(index)}
                className="p-2 rounded-lg hover:bg-black/20"
              >
                <Check size={18} />
              </button>

              <button
                onClick={() => onFail(index)}
                className="p-2 rounded-lg hover:bg-black/20"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}