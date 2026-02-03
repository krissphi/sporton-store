import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "../globals.css";
import AuthGuard from "./components/layouts/auth-guard";
import "./components/layouts/sidebar";
import Sidebar from "./components/layouts/sidebar";

const poppins = Poppins({
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SportOn Admin",
  description: "Admin dashboard for SportOn website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <div className="flex min-h-screen bg-white">
          <Sidebar />
          <main className="flex-1 ml-80 p-14 bg-[#F7F9FA] min-h-screen">
            <div className="max-w-6xl mx-auto">
              <AuthGuard>{children}</AuthGuard>
            </div>
          </main>
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      </body>
    </html>
  );
}
