import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import Link from "next/link";

export default function Home() {
	return (
		<main className="min-h-screen text-white flex flex-col items-center justify-between p-6">
			<Navbar />
			<Footer />
		</main>
	);
}
