import { Metadata } from "next";
import { Footer } from "@/components/footer";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Guia MicroSIP - Instalação e Configuração",
	description:
		"Tutorial completo para instalar e configurar o softphone MicroSIP para testes de telefonia VIVO.",
};

export default function MicroSIPPage() {
	return (
		<main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
			<div className="flex flex-col items-start justify-start flex-1 w-full max-w-3xl">
				<div className="bg-[#1a1a1a] rounded-xl p-6 w-full shadow-lg">
					<h1 className="text-2xl font-bold mb-4">MicroSIP: Instalação e Configuração</h1>

					<p className="text-sm mb-6 text-justify">
						O <strong>MicroSIP</strong> é um softphone gratuito, leve e de fácil utilização, que permite realizar e receber chamadas telefônicas via protocolo SIP (Session Initiation Protocol) diretamente pelo computador.
					</p>

					<h2 className="text-xl font-semibold mb-2">Instalação</h2>
					<ol className="list-decimal list-inside mb-6 text-sm text-stone-300">
						<li>
							<strong>Onde baixar</strong>
							<p>
								O MicroSIP pode ser baixado gratuitamente no site oficial:
							</p>
							<p className="mb-2">
								🔗{" "}
								<a
									href="https://www.microsip.org/downloads"
									target="_blank"
									rel="noopener noreferrer"
									className="text-blue-400 underline"
								>
									Site oficial
								</a>
							</p>
							<blockquote className="border-l-4 border-stone-500 pl-4 italic text-stone-300 mb-4">
								⚠️ Atenção: Sempre baixe o instalador diretamente do site oficial para garantir segurança e a versão mais recente.
							</blockquote>
						</li>
						<li>
							<strong>Passo a passo da instalação</strong>
							<ol className="list-decimal list-inside space-y-1 mt-2 text-stone-300">
								<li>Acesse o site e baixe a versão desejada.</li>
								<li>Após o download, dê dois cliques no arquivo para iniciar a instalação.</li>
								<li>
									Siga as etapas do instalador:
									<ul className="list-disc list-inside ml-5 mt-1">
										<li>Selecione o idioma (Português, se disponível).</li>
										<li>Aceite os termos de uso.</li>
										<li>Escolha a pasta de instalação (ou mantenha a padrão).</li>
										<li>Clique em <strong>Instalar</strong>.</li>
									</ul>
								</li>
								<li>Aguarde o término da instalação.</li>
								<li>Clique em <strong>Concluir</strong> para finalizar. O MicroSIP será iniciado automaticamente.</li>
							</ol>
						</li>
					</ol>

					<h2 className="text-xl font-semibold mb-2">Configuração</h2>
					<p className="text-sm mb-4 italic">
						Abaixo estão as configurações necessárias para utilizar o MicroSIP para testes de telefonia VIVO.
					</p>

					<ol className="list-decimal list-inside mb-6 text-sm text-stone-300">
						<li>
							Abra o aplicativo.
						</li>
						<li>
							Clique no botão mostrado na figura abaixo:
							<div className="my-4">
								{/* Substitua src pelo caminho real da sua imagem */}
								{/* Exemplo: <Image src="/microsip/Inicio.png" alt="Botão início MicroSIP" width={400} height={250} className="rounded" /> */}
								<Image
									src="/microsip/Inicio.png"
									alt="Botão início MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Selecione <em>configurações</em>.
							<div className="my-4">
								<Image
									src="/microsip/Config.png"
									alt="Tela configurações MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Desabilite a opção de <em>Modo chamada única</em>.
							<div className="my-4">
								<Image
									src="/microsip/Config - Chamada unica.png"
									alt="Configuração chamada única MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Mantenha apenas o CODEC <code>G.711 A-law</code>.
							<p>Para desabilitar os outros CODECs, clique no CODEC a ser desabilitado e clique na seta para a direita ←</p>
							<div className="my-4">
								<Image
									src="/microsip/Config - CODECs Habilitados.png"
									alt="Configuração CODECs habilitados MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Desabilite todas as opções demarcadas: <code>EC, H.264, H.263, VP8, VP9</code>.
							<div className="my-4">
								<Image
									src="/microsip/Config - CODECs Desabilitar.png"
									alt="Configuração CODECs a desabilitar MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Defina as seguintes configurações de portas:
							<ul className="list-disc list-inside ml-5 mt-1">
								<li>Porta de origem: <code>5060</code></li>
								<li>Portas RTP: <code>10000 - 20000</code></li>
							</ul>
							<div className="my-4">
								<Image
									src="/microsip/Config - Porta e RTP.png"
									alt="Configuração portas MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Abaixo você pode ver a configuração finalizada:
							<div className="my-4">
								<Image
									src="/microsip/Config - tudo alterado.png"
									alt="Configuração finalizada MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
					</ol>

					<h2 className="text-xl font-semibold mb-2">Criação de contas</h2>
					<p className="text-sm mb-4 italic">
						Abaixo estão as configurações de conta necessárias para utilizar o MicroSIP para testes de telefonia VIVO.
					</p>

					<ol className="list-decimal list-inside mb-6 text-sm text-stone-300">
						<li>
							Clique no botão mostrado na figura abaixo:
							<div className="my-4">
								<Image
									src="/microsip/Inicio.png"
									alt="Botão início MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Selecione <em>Adicionar Conta</em>.
							<div className="my-4">
								<Image
									src="/microsip/Conta.png"
									alt="Tela adicionar conta MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Adicione os seguintes dados na área demarcada:
							<ul className="list-disc list-inside ml-5 mt-1">
								<li>Usuário: <code>Número piloto do cliente</code></li>
								<li>Domínio: <code>192.168.25.1</code> (Proxy SIP da vivo)</li>
							</ul>
							<div className="my-4">
								<Image
									src="/microsip/Conta - config.png"
									alt="Configuração conta MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Lembre-se de definir o endereço público como o IP de LAN configurado na placa de rede do seu PC.
							<div className="my-4">
								<Image
									src="/microsip/Conta - IP.png"
									alt="Configuração IP conta MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
						<li>
							Abaixo você pode ver a configuração finalizada:
							<div className="my-4">
								<Image
									src="/microsip/Conta - final.png"
									alt="Configuração final conta MicroSIP"
									className="rounded max-w-full"
									width={400}
									height={250}
								/>
							</div>
						</li>
					</ol>
				</div>
			</div>
			<Footer />
		</main>
	);
}
