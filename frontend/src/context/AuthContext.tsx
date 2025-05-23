"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  properties: {
    nickname: string;
    profile_image?: string;
  };
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  isLoading: boolean; // 로딩 상태 추가
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: async () => {},
  isLoading: true, // 초기값은 true
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const router = useRouter();

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 사용자 정보 확인
    const initializeAuth = () => {
      const token = localStorage.getItem("kakao_token");
      const userData = localStorage.getItem("user_data");

      if (token && userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          setIsLoggedIn(true);
          setUser(parsedUserData);
        } catch (error) {
          console.error("Failed to parse user data:", error);
          localStorage.removeItem("kakao_token");
          localStorage.removeItem("user_data");
        }
      }
      setIsLoading(false); // 초기화 완료 후 로딩 상태 false로 설정
    };

    initializeAuth();
  }, []);

  const login = (userData: User) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem("kakao_token");

      if (token) {
        // 카카오 로그아웃 API 호출
        const response = await fetch("https://kapi.kakao.com/v1/user/logout", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // 로컬 스토리지 클리어
          localStorage.removeItem("kakao_token");
          localStorage.removeItem("user_data");

          setIsLoggedIn(false);
          setUser(null);

          alert("로그아웃 되었습니다.");
          router.push("/"); // 홈페이지로 리다이렉트
        } else {
          throw new Error("Logout failed");
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
