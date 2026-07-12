import { Metadata } from "next";
import CadernoTesteContainer from "@/components/caderno-teste/container";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Caderno de Testes - Testes SIP/PABX",
  description: "Ferramenta para auxiliar nos testes de bancada SIP e PABX"
};

export default function CadernoTestePage() {
  return (
    <main className="h-screen flex bg-background overflow-hidden p-2 gap-4">
      <Navbar />

      <section className="flex-1 rounded-3xl bg-background-secondary p-6 overflow-hidden">
        <CadernoTesteContainer />
      </section>
    </main>
  );
}
