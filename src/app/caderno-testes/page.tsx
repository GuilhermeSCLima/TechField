import { Metadata } from "next";
import CadernoTesteContainer from "@/components/caderno-teste/container";

export const metadata: Metadata = {
  title: "Caderno de Testes - Testes SIP/PABX",
  description: "Ferramenta para auxiliar nos testes de bancada SIP e PABX"
};

export default function CadernoTestePage() {
  return <CadernoTesteContainer />;
}
