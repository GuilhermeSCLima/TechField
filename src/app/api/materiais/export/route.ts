import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildMaterialsXlsx } from "@/lib/export/buildXlsx";

export async function POST(req: NextRequest) {
  try {
    const { mode, startDate, endDate } = await req.json();

    const where =
      mode === "period"
        ? {
            createdAt: {
              gte: new Date(startDate),
              lte: new Date(endDate),
            },
          }
        : undefined;

    const data = await prisma.usedMaterial.findMany({
      where,
      include: {
        technician: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!data.length) {
      return new Response(
        JSON.stringify({ error: "Nenhum dado encontrado" }),
        { status: 404 }
      );
    }

    const buffer = await buildMaterialsXlsx(data);

    return new Response(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition":
          "attachment; filename=used-materials.xlsx",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Erro ao gerar planilha" }),
      { status: 500 }
    );
  }
}
