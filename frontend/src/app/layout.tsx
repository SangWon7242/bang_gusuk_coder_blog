import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";
import Header from "@/components/Header";

import "./globals.css";

export const metadata: Metadata = {
  title: "방구석코딩 블로그",
  description: "방구석코딩 블로그 개발",
};

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-gray-600">
        <p>
          © {new Date().getFullYear()} 방구석코딩 블로그. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full">
      <head>
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
      </head>
      <body className="flex flex-col min-h-[100dvh]">
        <AuthProvider>
          <Header />
          <main className="flex-grow flex flex-col container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
