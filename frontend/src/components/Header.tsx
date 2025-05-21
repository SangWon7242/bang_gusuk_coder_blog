"use client";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, FileText, NotebookPen, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          <Image
            src="/images/logo.jpg"
            alt="로고"
            width={50}
            height={50}
            priority
          />
        </Link>
        <nav>
          <ul className="flex items-center space-x-6">
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
            {isLoggedIn && user ? (
              <li className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Image
                    src={
                      user.properties.profile_image ||
                      "/images/default-profile.png"
                    }
                    alt="프로필"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                  <span className="ml-2">{user.properties.nickname}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center hover:text-blue-600 transition-colors"
                >
                  <LogOut className="inline mr-1 h-4 w-4" />
                  <span>로그아웃</span>
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-blue-600 transition-colors"
                  >
                    <LogOut className="inline mr-1 h-4 w-4" />
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
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
