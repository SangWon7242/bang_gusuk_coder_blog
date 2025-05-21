import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { BookOpen, FileText, LogIn, NotebookPen } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "방구석코딩 블로그",
  description: "방구석코딩 블로그 개발",
};

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          <Image
            src="/images/logo.jpg"
            alt="로고"
            width={50}
            height={50}
            priority // 로고는 중요한 요소이므로 priority 추가
          />
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/posts"
                className="hover:text-blue-600 transition-colors"
              >
                <BookOpen className="inline mr-1 h-4 w-4" />
                <span>글</span>
              </Link>
            </li>
            <li>
              <Link
                href="/posts/write"
                className="hover:text-blue-600 transition-colors"
              >
                <NotebookPen className="inline mr-1 h-4 w-4" />
                <span>글 작성</span>
              </Link>
            </li>
            <li>
              <Link
                href="/my-posts"
                className="hover:text-blue-600 transition-colors"
              >
                <FileText className="inline mr-1 h-4 w-4" />
                <span>내 글</span>
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="hover:text-blue-600 transition-colors"
              >
                <LogIn className="inline mr-1 h-4 w-4" />
                <span>로그인</span>
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                회원가입
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
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
        <Header />
        <main className="flex-grow flex flex-col container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
