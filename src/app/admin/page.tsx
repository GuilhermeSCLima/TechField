import { Footer } from "@/components/footer";

export default function Home() {
	return (
		<main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
			<div className="flex flex-col items-center justify-center flex-1">
				<div className="bg-[#1a1a1a] rounded-xl p-6 w-96 shadow-lg">
					<h2 className="text-xl font-bold mb-4 text-center">Opa, acho que você não deveria estar aqui!</h2>
				</div>
			</div>
			<Footer />
		</main>
	);
}
