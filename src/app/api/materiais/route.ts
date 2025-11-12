import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { bd, clientName, technicianId, materials, equipments, dropBatch, strap: stringStrap, fiber: stringFiber, internalConnector: stringInternalConnector, externalConnector: stringExternalConnector } = data;

    const strap = Number(stringStrap)
    const fiber = Number(stringFiber)
    const internalConnector = Number(stringInternalConnector)
    const externalConnector = Number(stringExternalConnector)

    const usedMaterial = await prisma.usedMaterial.create({
      data: {
        bd,
        clientName,
        dropBatch,
        materials: materials.map((m: any) => ({
          name: m.name,
          quantity: m.quantity,
        })),
        equipments: equipments.map((e: any) => ({
          model: e.name,
          serial: e.serial,
        })),
        technician: {
          connect: { id: technicianId },
        },
        strap,
        fiber,
        internalConnector,
        externalConnector
      },
    });


    return NextResponse.json(usedMaterial);
  } catch (error: any) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Erro ao processar a requisição.", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(req: Request) {
  try {
    const materialList = await prisma.usedMaterial.findMany({
      include: { technician: true },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ materialList })
  } catch (error: any) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: "Erro ao processar a requisição.", details: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
