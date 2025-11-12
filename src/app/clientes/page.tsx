'use client'
import { Footer } from "@/components/footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import { saveItem, loadItem } from "@/helpers/indexedDB";

export default function Home() {
  return (
    <main className="min-h-screen text-white flex flex-col items-center justify-between p-6 w-screen">
      <div className="flex flex-col items-center justify-center w-full flex-1">
        <div className="bg-[#1a1a1a] rounded-xl p-6 sm:w-3/4 w-96 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">
            Informações sobre clientes:
          </h2>
          
        </div>
      </div>

      <Footer />
    </main>
  );
}
