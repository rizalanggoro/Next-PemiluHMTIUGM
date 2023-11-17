import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

// const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Pemilu HMTI UGM Periode 2024",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
