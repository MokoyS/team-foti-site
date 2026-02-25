import type { Metadata } from "next";
import { Play, Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LocaleProvider } from "@/contexts/LocaleContext";
import { Header } from "@/components/layout/Header";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/layout/Footer";
import { ScrollTrack } from "@/components/ui/ScrollTrack";

const play = Play({
  variable: "--font-play",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
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
        className={`${play.variable} ${poppins.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col w-full box-border`}
      >
        <LocaleProvider>
          <ScrollTrack />
          <Header />
          <main className="flex-1 w-full pt-24 box-border">{children}</main>
          <Footer />
          <CookieBanner />
        </LocaleProvider>
      </body>
    </html>
  );
}
