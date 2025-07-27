import { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Wifi, Phone, Layers } from "lucide-react"; // ícones

export const metadata: Metadata = {
  title: "Serviços",
  description: "Categorias de serviços disponíveis",
};

const categorias = [
  {
    nome: "Internet",
    cor: "bg-cyan-900/60",
    icone: <Wifi size={16} />,
    servicos: [
      { nome: "Instalação - Esteira comum", slug: "instalacao-esteira-comum" },
      { nome: "Instalação - IP Light", slug: "instalacao-ip-light" },
      { nome: "Migração - Acesso", slug: "migracao-acesso" },
      { nome: "Reparo - Internet", slug: "reparo-internet" },
      { nome: "Upgrade - Dados", slug: "upgrade-dados" },
    ],
  },
  {
    nome: "Telefonia",
    cor: "bg-blue-900/60",
    icone: <Phone size={16} />,
    servicos: [
      { nome: "Instalação - Telefonia", slug: "instalacao-telefonia" },
      { nome: "Migração => SIP", slug: "migracao-sip" },
      { nome: "Migração => Vox IP", slug: "migracao-voxip" },
      { nome: "Portabilidade", slug: "portabilidade" },
      { nome: "Reparo - Telefonia", slug: "reparo-telefonia" },
      { nome: "Telefonia - Configuração digistar", slug: "telefonia-digistar" },
      { nome: "Telefonia - Desvios aligera", slug: "telefonia-desvios" },
      { nome: "Testes - MicroSIP + Wireshark", slug: "testes-microsip" },
    ],
  },
	{
    nome: "Outros",
    cor: "bg-violet-900/60",
    icone: <Layers size={16} />,
    servicos: [
      { nome: "Equipamentos - Reset", slug: "equipamentos-reset" },
      { nome: "Rede - Calculadora IP e máscaras", slug: "rede-calculadora" },
      { nome: "Software - MicroSIP", slug: "software-microsip" },
    ],
  },
];

export default function ServicosPage() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-6xl flex-1 justify-center">
        {categorias.map((cat, i) => (
          <div
            key={i}
            className={`flex flex-col rounded-xl p-4 w-full sm:w-1/3 shadow-md ${cat.cor}`}
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center justify-between">
              {cat.nome}
              <span className="text-xs bg-stone-800 px-2 py-0.5 rounded-lg shadow">
                {cat.servicos.length}
              </span>
            </h2>
            <ul className="flex flex-col gap-2">
              {cat.servicos.map((servico, j) => (
                <li key={j}>
                  <Link
                    href={`/servicos/${servico.slug}`}
                    className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 transition rounded-lg p-2 text-sm"
                  >
                    {cat.icone}
                    {servico.nome}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
