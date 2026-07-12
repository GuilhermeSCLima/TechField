import CarimbosContainer from "@/components/carimbos/container";
import { CarimboType, isCarimboType } from "@/components/carimbos/types";
import { Navbar } from "@/components/navbar";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Gerador de Carimbos",
  description: "Ferramenta para criar carimbos de Provisionamento e Reparo.",
};

interface PageProps {
  params: Promise<{
    type: CarimboType;
  }>;
}

export default async function CarimbosPage({ params }: PageProps) {
  const { type } = await params;

  if(!isCarimboType(type)) return notFound()

  return (
    <main className="h-screen flex bg-background overflow-hidden p-2 gap-4">
      <Navbar />

      <section className="flex-1 rounded-3xl bg-background-secondary p-6 overflow-hidden">
        <CarimbosContainer carimboType={type} />
      </section>
    </main>
  );
}
