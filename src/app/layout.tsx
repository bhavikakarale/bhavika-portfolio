import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"] });
const serif = Playfair_Display({ variable: "--font-serif", subsets: ["latin"] });
const mono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });
export const metadata: Metadata = { title: "Bhavika Karale — Software Engineer", description: "A software engineer building reliable systems, thoughtful product experiences, and practical AI automation." };
export default function RootLayout({ children }: LayoutProps<"/">) { return <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}><body>{children}</body></html>; }
