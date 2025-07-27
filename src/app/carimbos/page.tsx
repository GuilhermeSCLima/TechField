import HomeClient from "@/components/gerador/inicio";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerador de Carimbos",
  description: "Ferramenta para criar carimbos de Provisionamento e Reparo.",
};

export default function HomePage() {
  return <HomeClient />;
}
