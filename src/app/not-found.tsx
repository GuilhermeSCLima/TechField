"use client";

import { Footer } from "@/components/footer";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
	const pathname = usePathname();
	const [_, aba] = pathname.split("/");
	return (
		<main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
			<div className="flex flex-col items-center justify-center flex-1">
				<div className="bg-[#1a1a1a] rounded-xl p-6 sm:w-96 shadow-lg">
					{aba == "servicos" ? (<>

						<h2 className="text-lg font-bold mb-4 text-center">⚠️SERVIÇO/MATERIAL EM FALTA⚠️</h2>
						<p className="self-center text-justify">Ops, acho que você chegou muito cedo! Ainda estou preparando este material de apoio, qualquer dúvida entre em contato comigo via Whatsapp ou email.</p>
						<div className="flex flex-col gap-3 mt-5">
							<Link className="self-center px-3 py-1 rounded-md bg-stone-600 text-white hover:bg-stone-500 transition-colors duration-200" href={"https://wa.me/5541991474592"}>Whatsapp</Link>
							<Link className="self-center px-3 py-1 rounded-md bg-stone-600 text-white hover:bg-stone-500 transition-colors duration-200" href={"mailto:contato@guilhermelima.dev"}>E-mail</Link>
						</div>
					</>) : (<>
						<h2 className="text-lg font-bold mb-4 text-center">⛔PAGINA NÃO ENCONTRADA⛔</h2>
						<p className="self-center text-justify">Ops, acho que você se enganou, essa pagina que você tentou acessar não existe ou não está mais disponivel!</p>
					</>)}
				</div>
			</div>
			<Footer />
		</main>
	)
}