import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Feedback flow - Create, monitor and design your projects here",
  description: "Feedback flow - Create, monitor and design your projects here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-blue-100">
          {children}
    </div>
  );
}
