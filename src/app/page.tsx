"use client";
import { useState, useEffect } from "react";

type Etapa = "inicio" | "provisionamento" | "reparo" | "resultado";

export default function Home() {
  const [etapa, setEtapa] = useState<Etapa>("inicio");
  const [perguntaIndex, setPerguntaIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [etapaAnterior, setEtapaAnterior] = useState<Etapa>("inicio");

  const [respostasProvisionamento, setRespostasProvisionamento] = useState({
    equipamento: "",
    produto: "",
    serial: "",
    designador: "",
    ostbs: "",
    cvlan: "",
  });

  const [respostasReparo, setRespostasReparo] = useState({
    os: "",
    tecnico: "",
    armario: "",
    cliente: "",
    posicao: "",
    designador: "",
    testes: "",
    causa: "",
    endereco: "",
    acao: "",
    validacao_nome: "",
    validacao_telefone: "",
    proxima: "Em análise, retornarei em breve.",
  });

  useEffect(() => {
    const tecnicoSalvo = localStorage.getItem("tecnico");
    if (tecnicoSalvo && etapa === "reparo" && perguntaIndex === 0) {
      setRespostasReparo((prev) => ({ ...prev, tecnico: tecnicoSalvo }));
      setInputValue(tecnicoSalvo);
    }
  }, [etapa, perguntaIndex]);

  const perguntasProvisionamento = [
    { chave: "equipamento", texto: "Qual o equipamento? (ex: ONT)" },
    { chave: "produto", texto: "Qual o serviço?" },
    { chave: "serial", texto: "Serial GPON?" },
    { chave: "designador", texto: "Designador?" },
    { chave: "ostbs", texto: "OS TBS?" },
    { chave: "cvlan", texto: "C-VLAN?" },
  ];

  const perguntasReparo = [
    { chave: "tecnico", texto: "Nome do técnico?" },
    { chave: "os", texto: "Nº BD?" },
    { chave: "cliente", texto: "Nome do cliente/Empresa?" },
    { chave: "armario", texto: "Armário / GPON? (opcional)" },
    { chave: "posicao", texto: "Posição? (opcional)" },
    { chave: "designador", texto: "OSTBS / TA / Designador?" },
    { chave: "testes", texto: "Testes realizados?" },
    { chave: "causa", texto: "Causa raiz (defeito)?" },
    { chave: "endereco", texto: "Endereço do cliente?" },
    { chave: "acao", texto: "Ação tomada?" },
    { chave: "validacao_nome", texto: "Nome de quem acompanhou o serviço?" },
    {
      chave: "validacao_telefone",
      texto: "Telefone de quem acompanhou o serviço?",
    },
  ];

  const handleResposta = (valor: string) => {
    const trimmed = valor.trim();

    if (etapa === "provisionamento") {
      const chave = perguntasProvisionamento[perguntaIndex]
        .chave as keyof typeof respostasProvisionamento;
      setRespostasProvisionamento((prev) => ({ ...prev, [chave]: trimmed }));

      if (perguntaIndex + 1 < perguntasProvisionamento.length) {
        setPerguntaIndex(perguntaIndex + 1);
        setInputValue(""); // limpa para a próxima pergunta
      } else {
        setEtapaAnterior("provisionamento");
        setEtapa("resultado");
      }
    }

    if (etapa === "reparo") {
      const chave = perguntasReparo[perguntaIndex]
        .chave as keyof typeof respostasReparo;

      if (chave === "tecnico" && trimmed) {
        localStorage.setItem("tecnico", trimmed);
      }

      setRespostasReparo((prev) => ({ ...prev, [chave]: trimmed }));

      if (perguntaIndex + 1 < perguntasReparo.length) {
        setPerguntaIndex(perguntaIndex + 1);
        setInputValue(""); // limpa para a próxima pergunta
      } else {
        setEtapaAnterior("reparo");
        setEtapa("resultado");
      }
    }
  };

  const resetar = () => {
    setEtapa("inicio");
    setEtapaAnterior("inicio");
    setPerguntaIndex(0);
    setInputValue("");
    setRespostasProvisionamento({
      equipamento: "",
      produto: "",
      serial: "",
      designador: "",
      ostbs: "",
      cvlan: "",
    });
    setRespostasReparo({
      os: "",
      tecnico: localStorage.getItem("tecnico") || "",
      armario: "",
      posicao: "",
      designador: "",
      cliente: "",
      testes: "",
      causa: "",
      endereco: "",
      acao: "",
      validacao_nome: "",
      validacao_telefone: "",
      proxima: "",
    });
  };

  const perguntasAtuais =
    etapa === "provisionamento"
      ? perguntasProvisionamento
      : etapa === "reparo"
      ? perguntasReparo
      : [];

  async function copiarTexto(texto: string) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(texto);
        alert("Carimbo copiado para a área de transferência!");
      } else {
        // Fallback para browsers que não suportam clipboard API
        const textarea = document.createElement("textarea");
        textarea.value = texto;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Carimbo copiado para a área de transferência!");
      }
    } catch {
      alert("Não foi possível copiar o carimbo. Tente novamente.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-slate-800 rounded-xl p-6 shadow-lg space-y-4">
        {etapa === "inicio" && (
          <>
            <p className="text-lg">👋 Olá! Escolha o tipo de carimbo:</p>
            <div className="flex gap-4">
              <button
                onClick={() => setEtapa("provisionamento")}
                className="bg-blue-600 px-4 py-2 rounded"
              >
                Provisionamento
              </button>
              <button
                onClick={() => setEtapa("reparo")}
                className="bg-yellow-600 px-4 py-2 rounded"
              >
                Reparo
              </button>
            </div>
          </>
        )}

        {(etapa === "provisionamento" || etapa === "reparo") &&
          perguntaIndex < perguntasAtuais.length && (
            <>
              <p className="text-lg">{perguntasAtuais[perguntaIndex].texto}</p>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleResposta(inputValue);
                  }
                }}
                className="w-full p-2 rounded bg-slate-700 border border-slate-600"
                autoFocus
              />
              <p className="text-sm text-slate-400">
                Pressione Enter para continuar
              </p>
            </>
          )}

        {etapa === "resultado" && (
          <>
            <p className="text-lg font-semibold">✅ Carimbo gerado:</p>
            <pre className="bg-slate-900 p-4 rounded whitespace-pre-wrap text-green-400 text-sm leading-relaxed">
              {etapaAnterior === "provisionamento"
                ? `*PROVISÓRIO:* ${respostasProvisionamento.equipamento}
*PRODUTO:* ${respostasProvisionamento.produto}
*SERIAL GPON:* ${respostasProvisionamento.serial}
*DESIGNADOR:* ${respostasProvisionamento.designador}
*OSTBS:* ${respostasProvisionamento.ostbs}
*C-VLAN:* ${respostasProvisionamento.cvlan}`
                : `⚠️Atualização Atividades B2B ⚠️*

TÉCNICO: ${respostasReparo.tecnico}
BD: ${respostasReparo.os}
CLIENTE: ${respostasReparo.cliente}
ARD: ${respostasReparo.armario || ""}
POSIÇÃO: ${respostasReparo.posicao || ""}
OS/TA/DESIGNADOR: ${respostasReparo.designador || ""}

TESTE: ${respostasReparo.testes}
CAUSA RAIZ: ${respostasReparo.causa}
ENDEREÇO: ${respostasReparo.endereco}
AÇÃO: ${respostasReparo.acao}

Validado por:
${respostasReparo.validacao_nome}
${respostasReparo.validacao_telefone}

Próxima Atualização:`}
            </pre>

            <div className="flex gap-4 mt-4 flex-wrap">
              <button
                onClick={() => {
                  const texto =
                    etapaAnterior === "provisionamento"
                      ? `*PROVISÓRIO:* ${respostasProvisionamento.equipamento}
*PRODUTO:* ${respostasProvisionamento.produto}
*SERIAL GPON:* ${respostasProvisionamento.serial}
*DESIGNADOR:* ${respostasProvisionamento.designador}
*OSTBS:* ${respostasProvisionamento.ostbs}
*C-VLAN:* ${respostasProvisionamento.cvlan}`
                      : `⚠️Atualização Atividades B2B ⚠️*

TÉCNICO: ${respostasReparo.tecnico}
BD: ${respostasReparo.os}
CLIENTE: ${respostasReparo.cliente}
ARD: ${respostasReparo.armario || ""}
POSIÇÃO: ${respostasReparo.posicao || ""}
OS/TA/DESIGNADOR: ${respostasReparo.designador || ""}

TESTE: ${respostasReparo.testes}
CAUSA RAIZ: ${respostasReparo.causa}
ENDEREÇO: ${respostasReparo.endereco}
AÇÃO: ${respostasReparo.acao}

Validado por:
${respostasReparo.validacao_nome}
${respostasReparo.validacao_telefone}

Próxima Atualização:`;

                  copiarTexto(texto);
                }}
                className="bg-green-600 px-4 py-2 rounded"
              >
                Copiar carimbo
              </button>
              <button
                onClick={resetar}
                className="bg-slate-700 px-4 py-2 rounded"
              >
                Novo carimbo
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
