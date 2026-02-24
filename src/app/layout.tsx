import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { Header } from "@/components/layout/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/layout/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Team Foti | L'excellence du karting depuis 40 ans",
  description:
    "Institution familiale du karting à Loriol-sur-Drôme. Boutique karts et pièces, palmarès Champion d'Europe. Du pro au garage.",
  openGraph: {
    title: "Team Foti | Karting depuis 40 ans",
    description: "De la compétition internationale à votre garage.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} ${geistMono.variable} font-heading antialiased bg-background text-foreground min-h-screen flex flex-col w-full box-border`}
      >
        <LocaleProvider>
          <Header />
          <main className="flex-1 w-full pt-24 box-border">{children}</main>
          <Footer />
          <CookieBanner />
        </LocaleProvider>
      </body>
    </html>
  );
}
