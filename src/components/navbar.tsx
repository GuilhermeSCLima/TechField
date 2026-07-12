"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  FileText,
  ClipboardList,
  Package,
  Lock,
  LogIn,
  UserPlus,
} from "lucide-react";

export function Navbar() {
  // false = visitante
  const [user, setUser] = useState<{ name: string } | false>(false);

  return (
    <header className="w-80 h-full rounded-3xl bg-background-secondary flex flex-col p-4 overflow-hidden">
      <div className="shrink-0">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/icon-512x512.png"
            alt="Logo"
            width={50}
            height={50}
          />

          <div>
            <h1 className="text-3xl font-bold leading-none">
              TECHFIELD
            </h1>

            <span className="text-xs text-muted-foreground">
              Apoio ao técnico
            </span>
          </div>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 min-h-0 overflow-y-auto mt-8 pr-2">
        <p className="px-4 text-xs uppercase tracking-widest text-muted-foreground">
          Ferramentas
        </p>

        <details className="group">
          <summary className="flex items-center justify-between rounded-xl px-4 py-3 cursor-pointer hover:bg-background transition">
            <div className="flex items-center gap-2">
              <FileText size={18} />
              <span>Carimbos</span>
            </div>

            <ChevronDown className="h-4 w-4 transition group-open:rotate-180" />
          </summary>

          <div className="mt-2 ml-6 flex flex-col gap-1 border-l border-border pl-3">
            <Link
              href="/carimbos/provisionamento"
              className="rounded-lg px-3 py-2 hover:bg-background"
            >
              🔗 Provisionamento ONT/HGU
            </Link>

            <Link
              href="/carimbos/reparo"
              className="rounded-lg px-3 py-2 hover:bg-background"
            >
              ⚠️ Reparo
            </Link>

            <Link
              href="/carimbos/instalacao"
              className="rounded-lg px-3 py-2 hover:bg-background"
            >
              🚀 Ativação / Migração
            </Link>

            <Link
              href="/carimbos/lancamento"
              className="rounded-lg px-3 py-2 hover:bg-background"
            >
              🌐 Lançamento de Rede
            </Link>

            {user ? (
              <Link
                href="/carimbos"
                className="rounded-lg px-3 py-2 hover:bg-background"
              >
                🕒 Histórico
              </Link>
            ) : (
              <button
                className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground hover:bg-background"
              >
                <div className="flex items-center gap-2">
                  🕒 Histórico
                </div>
                <Lock size={16} />
              </button>
            )}
          </div>
        </details>

        <Link
          href="/caderno-testes"
          className="flex items-center gap-2 rounded-xl px-4 py-3 hover:bg-background transition"
        >
          <ClipboardList size={18} />
          Caderno de Testes
        </Link>

        {
          user ? (
            <Link
              href="/materiais"
              className="flex items-center gap-2 rounded-xl px-4 py-3 hover:bg-background transition"
            >
              <Package size={18} />
              Meus Materiais
            </Link>
          ) : (
            <button
              className="flex items-center justify-between rounded-xl px-4 py-3 text-muted-foreground hover:bg-background transition w-full"
            >
              <div className="flex items-center gap-2">
                <Package size={18} />
                Meus Materiais
              </div>

              <Lock size={16} />
            </button>
          )
        }
      </nav >

      {/* Rodapé */}
      <div className="shrink-0 pt-4 border-t border-border">

        {
          user ? (
            <div className="border-t border-border pt-4">
              <div className="flex items-center gap-3 rounded-xl bg-background p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-bold">
                  {user.name[0]}
                </div>

                <div className="flex-1">
                  <p className="font-medium">{user.name}</p>

                  <p className="text-xs text-muted-foreground">
                    Técnico
                  </p>
                </div>

                <button
                  onClick={() => setUser(false)}
                  className="text-red-500 hover:text-red-400"
                >
                  Sair
                </button>
              </div>
            </div>
          ) : (
            <div className="border-t border-border pt-4 space-y-3">
              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-3">
                <p className="text-sm font-medium">
                  Modo visitante
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Faça login para salvar carimbos, controlar materiais e sincronizar seus dados.
                </p>
              </div>

              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 py-3 font-medium transition hover:bg-blue-600"
              >
                <LogIn size={18} />
                Entrar
              </Link>

              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-xl border py-3 font-medium transition hover:bg-background"
              >
                <UserPlus size={18} />
                Criar conta
              </Link>
            </div>
          )
        }
      </div>
    </header >
  );
}