"use client";
import { useState } from "react";
import { Footer } from "@/components/footer";
import CadernoTesteHeader from "./header";
import CadernoTesteLista from "./lista";
import { numeros } from "./dados";

export default function CadernoTesteContainer() {
	const [checados, setChecados] = useState<number[]>([]);

	const toggleCheck = (index: number) => {
		setChecados((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	return (
		<main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
			<div className="flex flex-col items-center justify-center flex-1 w-full max-w-lg">
				<div className="bg-[#1a1a1a] rounded-xl p-6 w-full shadow-lg">
					<CadernoTesteHeader
						total={numeros.length}
						concluidos={checados.length}
					/>
					<CadernoTesteLista
						numeros={numeros}
						checados={checados}
						toggleCheck={toggleCheck}
					/>
					<div
						className="w-full mt-3 rounded-lg shadow-md text-white text-center"
						style={{
							backgroundColor: `hsl(${checados.length / numeros.length * 120}, 70%, 40%)`,
						}}
					>
						{checados.length} / {numeros.length}
					</div>
				</div>
			</div>
			<Footer />
		</main>
	);
}
