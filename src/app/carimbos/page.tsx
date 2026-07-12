import CarimbosContainer from "@/components/carimbos/container";
import { CarimboType, isCarimboType } from "@/components/carimbos/types";
import { Navbar } from "@/components/navbar";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Gerador de Carimbos",
  description: "Ferramenta para criar carimbos de Provisionamento e Reparo.",
};


export default async function CarimbosPage() {
  redirect("/carimbos/reparo");
}
