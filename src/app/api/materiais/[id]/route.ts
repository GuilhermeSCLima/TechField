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
  } catch (error: unknown) {
    console.error(error);

    const message =
      error instanceof Error
        ? error.message
        : "Erro ao processar a requisição.";

    return new NextResponse(
      JSON.stringify({
        error: "Erro ao processar a requisição.",
        details: message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

}
