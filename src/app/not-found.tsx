"use client";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background-primary p-6">
      <div className="max-w-3xl w-full rounded-3xl bg-background-secondary border border-white/10 p-12">
        <div className="flex flex-col items-center text-center gap-8">

          {/* Ilustração */}
          <svg
            width="500"
            height="180"
            viewBox="0 0 500 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-full"
          >
            {/* ONT */}
            <rect
              x="20"
              y="55"
              width="120"
              height="70"
              rx="12"
              fill="currentColor"
              className="text-zinc-800"
            />

            {/* <text
              x="80"
              y="85"
              textAnchor="middle"
              fill="#fff"
              fontSize="14"
              fontWeight="600"
            >
              ONT
            </text> */}

            {/* LEDs */}
            <circle cx="50" cy="105" r="4" fill="#22c55e" />
            <circle cx="70" cy="105" r="4" fill="#22c55e" />
            <circle cx="90" cy="105" r="4" fill="#22c55e" />
            <circle cx="110" cy="105" r="4" fill="#22c55e" />

            {/* Cabo interrompido */}
            <line
              x1="140"
              y1="90"
              x2="220"
              y2="90"
              stroke="#60a5fa"
              strokeWidth="4"
              strokeDasharray="12 8"
            />

            {/* X */}
            <line
              x1="240"
              y1="75"
              x2="270"
              y2="105"
              stroke="#ef4444"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <line
              x1="270"
              y1="75"
              x2="240"
              y2="105"
              stroke="#ef4444"
              strokeWidth="5"
              strokeLinecap="round"
            />

            <line
              x1="290"
              y1="90"
              x2="370"
              y2="90"
              stroke="#60a5fa"
              strokeWidth="4"
              strokeDasharray="12 8"
            />

            {/* Nuvem */}
            <path
              d="M415 120H455C472 120 485 108 485 92C485 77 474 65 458 64C454 49 442 40 427 40C410 40 396 51 393 67C379 69 368 80 368 94C368 108 379 120 395 120H415Z"
              fill="#3f3f46"
            />

            <text
              x="427"
              y="95"
              textAnchor="middle"
              fill="#fff"
              fontSize="26"
              fontWeight="700"
            >
              404
            </text>
          </svg>

          {/* Conteúdo */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold">
              Conexão não encontrada
            </h1>

            <p className="text-zinc-400 max-w-xl">
              O recurso que você tentou acessar não respondeu ao teste de
              conectividade. Verifique o endereço e tente novamente.
            </p>
          </div>

          {/* Botões */}
          <div className="flex gap-4">
            <button
              onClick={() => window.history.back()}
              className="px-5 py-2 rounded-xl border border-white/10 hover:bg-white/5 transition"
            >
              Voltar
            </button>

            <a
              href="/"
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
            >
              Inicio
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}