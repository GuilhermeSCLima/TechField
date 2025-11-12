import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password || password !== process.env.AUTH_SECRET) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // Gera token JWT com expiração curta (ex: 30 min)
    const token = jwt.sign(
      { auth: true },
      process.env.JWT_SECRET!,
      { expiresIn: "30m" }
    );

    return NextResponse.json({ token });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
