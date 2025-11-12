import { Footer } from "@/components/footer";
import Link from "next/link";

const facilidades = [
	{ id: 1, titulo: "Carimbos", descricao: "Criação e personalização de carimbos", url: "/carimbos" },
	{ id: 2, titulo: "Caderno de testes", descricao: "Organização dos testes realizados", url: "/caderno-testes" },
	{ id: 3, titulo: "Detalhe dos serviços", descricao: "Detalhamento completo dos serviços prestados e materiais de apoio", url: "/servicos" },
	{ id: 4, titulo: "Materiais utilizados", descricao: "Defina os materiais utilizados durante a atividade", url: "/materiais" },
	{ id: 5, titulo: "Clientes conhecidos", descricao: "Busque por clientes conhecidos", url: "/clientes", inactive: true },
];

export default function Home() {
	return (
		<main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
			<div className="flex flex-col items-center justify-center flex-1">
				<div className="bg-[#1a1a1a] rounded-xl p-6 w-96 shadow-lg">
					<h2 className="text-xl font-bold mb-4 text-center">Navegue até:</h2>
					<ul className="space-y-3">
						{facilidades.map((facilidade) => (
							<li
								key={facilidade.id}
								className={`bg-stone-700 p-3 rounded-md transition ${facilidade?.inactive ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'hover:bg-stone-500 cursor-pointer'}`}
							>
								<Link href={facilidade.url}>
									<h3 className="font-semibold">{facilidade.titulo}</h3>
									<p className="text-sm text-stone-300">{facilidade.descricao}</p>
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
			<Footer />
		</main>
	);
}
