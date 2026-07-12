import { Metadata } from "next";
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: "Gerador de Carimbos",
  description: "Ferramenta para criar carimbos de Provisionamento e Reparo.",
};

export default function HomePage() {
  return (
    <>
      <Navbar />
    </>
  );
}
