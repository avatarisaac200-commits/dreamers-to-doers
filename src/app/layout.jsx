import { Fraunces, Inter_Tight, JetBrains_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata = {
  title: "Dreamers to Doers",
  description:
    "Pan African Project and Event Management Masterclass on designing, funding, and executing world class events and social impact projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${interTight.variable} ${jetBrainsMono.variable} ${orbitron.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
