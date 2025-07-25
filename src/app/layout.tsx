import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
