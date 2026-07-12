import type { Metadata } from "next";
import { Roboto, Geist } from "next/font/google";
import "./globals.css";
import ServiceWorkerProvider from "@/components/ServiceWorkerProvider";
import { NotifyProvider } from "@/components/notify/NotifyProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
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
    <html lang="pt-BR" className={`dark ${cn("font-sans", geist.variable)}`}>
      <head>
        <meta name="theme-color" content="#0f172a" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body
        className={`${roboto.variable} antialiased`}
      >
        <NotifyProvider>
          {children}
        </NotifyProvider>
        <ServiceWorkerProvider />
      </body>
    </html>
  );
}
