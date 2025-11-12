// /app/api/materiais/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ agora estamos aguardando o params

  try {
    const material = await prisma.usedMaterial.findUnique({
      where: { id },
      include: {
        technician: true, // inclui dados do técnico
      },
    });

    if (!material) {
      return NextResponse.json({ error: "Material não encontrado" }, { status: 404 });
    }

    return NextResponse.json({ material });
  } catch (error: any) {
    console.error(error);
    return new NextResponse(
      JSON.stringify({
        error: "Erro ao processar a requisição.",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
