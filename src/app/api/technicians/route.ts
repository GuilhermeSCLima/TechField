import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const technicians = await prisma.technician.findMany({
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ technicians });
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    if (!name || name.trim() === "")
      return NextResponse.json({ error: "Nome inválido" }, { status: 400 });

    const existing = await prisma.technician.findFirst({
      where: { name: { equals: name, mode: "insensitive" } },
    });
    if (existing)
      return NextResponse.json({ error: "Técnico já cadastrado" }, { status: 409 });

    const newTech = await prisma.technician.create({
      data: { name },
    });
    return NextResponse.json({ success: true, newTech });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro ao criar técnico" }, { status: 500 });
  }
}
