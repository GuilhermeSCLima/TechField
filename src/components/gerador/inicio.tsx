"use client";
import { useState, useEffect } from "react";
import Perguntas from "@/components/gerador/perguntas";
import Resultado from "@/components/gerador/resultado";
import EtapasIniciais from "@/components/gerador/initialStep";
import { Footer } from "@/components/footer";

export type Etapa = "inicio" | "provisionamento" | "reparo" | "resultado";

export default function InicioCarimbos() {
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
    { chave: "validacao_telefone", texto: "Telefone de quem acompanhou o serviço?" },
  ];

  const perguntasAtuais =
    etapa === "provisionamento"
      ? perguntasProvisionamento
      : etapa === "reparo"
      ? perguntasReparo
      : [];

  const handleResposta = (valor: string) => {
    const trimmed = valor.trim();

    if (etapa === "provisionamento") {
      const chave = perguntasProvisionamento[perguntaIndex].chave as keyof typeof respostasProvisionamento;
      setRespostasProvisionamento((prev) => ({ ...prev, [chave]: trimmed }));

      if (perguntaIndex + 1 < perguntasProvisionamento.length) {
        setPerguntaIndex(perguntaIndex + 1);
        setInputValue("");
      } else {
        setEtapaAnterior("provisionamento");
        setEtapa("resultado");
      }
    }

    if (etapa === "reparo") {
      const chave = perguntasReparo[perguntaIndex].chave as keyof typeof respostasReparo;

      if (chave === "tecnico" && trimmed) {
        localStorage.setItem("tecnico", trimmed);
      }

      setRespostasReparo((prev) => ({ ...prev, [chave]: trimmed }));

      if (perguntaIndex + 1 < perguntasReparo.length) {
        setPerguntaIndex(perguntaIndex + 1);
        setInputValue("");
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

  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-[#1a1a1a] rounded-xl p-6 w-96 shadow-lg flex flex-col gap-2">
          {etapa === "inicio" && <EtapasIniciais setEtapa={setEtapa} />}
          {(etapa === "provisionamento" || etapa === "reparo") &&
            perguntaIndex < perguntasAtuais.length && (
              <Perguntas
                pergunta={perguntasAtuais[perguntaIndex].texto}
                inputValue={inputValue}
                setInputValue={setInputValue}
                handleResposta={handleResposta}
              />
            )}
          {etapa === "resultado" && (
            <Resultado
              etapaAnterior={etapaAnterior}
              respostasProvisionamento={respostasProvisionamento}
              respostasReparo={respostasReparo}
              resetar={resetar}
            />
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
