"use client";

export default function Resultado({
  etapaAnterior,
  respostasProvisionamento,
  respostasReparo,
  resetar,
}: any) {
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

  const copiarTexto = async () => {
    try {
      await navigator.clipboard.writeText(texto);
      alert("Carimbo copiado para a área de transferência!");
    } catch {
      alert("Não foi possível copiar o carimbo.");
    }
  };

  return (
    <>
      <p className="text-lg font-semibold">✅ Carimbo gerado:</p>
      <pre className="bg-stone-800 p-4 rounded whitespace-pre-wrap text-green-400 text-sm leading-relaxed">
        {texto}
      </pre>
      <div className="flex gap-4 mt-4 flex-wrap">
        <button onClick={copiarTexto} className="bg-green-600 px-4 py-2 rounded">
          Copiar carimbo
        </button>
        <button onClick={resetar} className="bg-slate-700 px-4 py-2 rounded">
          Novo carimbo
        </button>
      </div>
    </>
  );
}
