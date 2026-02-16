"use client";
import { Etapa } from './inicio';

interface ResultadoProps {
	etapaAnterior?: Etapa;
	respostasProvisionamento?: {
		equipamento: string
		produto: string
		serial: string
		designador: string
		ostbs: string
		cvlan: string
	},
	respostasReparo: {
		os: string,
		tecnico: string,
		armario: string,
		cliente: string,
		designador: string,
		testes: string,
		causa: string,
		endereco: string,
		cidade: string,
		estado: string,
		acao: string,
		materiais: string,
		validacao_nome: string,
		validacao_telefone: string,
		proxima: string,
	},
	resetar: () => void
}

export default function Resultado({
	etapaAnterior,
	respostasProvisionamento,
	respostasReparo,
	resetar,
}: ResultadoProps) {
	const texto =
		etapaAnterior === "provisionamento"
			? `*PROVISÓRIO:* ${respostasProvisionamento?.equipamento}
*PRODUTO:* ${respostasProvisionamento?.produto}
*SERIAL GPON:* ${respostasProvisionamento?.serial}
*DESIGNADOR:* ${respostasProvisionamento?.designador}
*OSTBS:* ${respostasProvisionamento?.ostbs}
*C-VLAN:* ${respostasProvisionamento?.cvlan}`
			: `⚠️Atualização Atividades B2B ⚠️*

Técnico: ${respostasReparo.tecnico}
OS: ${respostasReparo.os}

Cliente: ${respostasReparo.cliente}
Endereço: ${respostasReparo.endereco}
Cidade: ${respostasReparo.cidade}
Estado: ${respostasReparo.estado}
Validado por:
${respostasReparo.validacao_nome}
${respostasReparo.validacao_telefone}

Dados de rede: ${respostasReparo.armario || ""}
OS/TA/DESIGNADOR: ${respostasReparo.designador || ""}

CAUSA RAIZ: 
${respostasReparo.causa}

AÇÃO: 
${respostasReparo.acao}

Materiais Utilizados: 
${respostasReparo.materiais}

Próxima Atualização:
${respostasReparo.proxima}
`;
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
			<pre className="bg-stone-800 p-4 rounded text-green-400 text-sm leading-relaxed break-words whitespace-pre-wrap overflow-x-auto">
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
