import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ServiceWorkerProvider from "@/components/ServiceWorkerProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apoio ao técnico de dados VIVO - Guilherme Lima",
  description: "Seja bem vindo a pagina de apoio ao técnico de dados VIVO",
	openGraph: {
		type: "website",
		description:"Seja bem vindo a pagina de apoio ao técnico de dados VIVO",
		title: "Apoio ao técnico de dados VIVO - Guilherme Lima",
		locale: "pt-BR"
	}
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <ServiceWorkerProvider />
      </body>
    </html>
  );
}
