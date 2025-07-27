"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Footer() {
	const pathname = usePathname();

	return (
		<footer className="text-stone-400 text-sm mt-6 flex flex-col gap-3">
			Desenvolvido por Guilherme Lima
			<Link href={"/"} className={pathname === "/" ? "hidden" : "self-center px-3 py-1 rounded-md bg-stone-600 text-white hover:bg-stone-500 transition-colors duration-200"}> Retorne ao início</Link>
		</footer>
	)
}