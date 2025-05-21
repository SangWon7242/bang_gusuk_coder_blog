"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AuthPage() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      getKakaoToken(code);
    }
  }, []);

  const getKakaoToken = async (code: string) => {
    try {
      const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
      const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

      const tokenResponse = await fetch("https://kauth.kakao.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: REST_API_KEY!,
          redirect_uri: REDIRECT_URI!,
          code: code,
        }),
      });

      if (!tokenResponse.ok) {
        throw new Error("Failed to fetch token");
      }

      const tokenData = await tokenResponse.json();

      // 받은 토큰으로 사용자 정보 가져오기
      const userResponse = await fetch("https://kapi.kakao.com/v2/user/me", {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userResponse.json();

      // 토큰과 사용자 정보를 로컬 스토리지에 저장
      localStorage.setItem("kakao_token", tokenData.access_token);
      localStorage.setItem("user_data", JSON.stringify(userData));

      // AuthContext의 상태 업데이트
      login(userData);

      // 저장된 리다이렉트 URL이 있는지 확인
      const redirectUrl = localStorage.getItem("redirectUrl");
      if (redirectUrl) {
        localStorage.removeItem("redirectUrl"); // 사용 후 삭제
        router.push(redirectUrl);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Error during authentication:", error);
      router.push("/login");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <p>로그인 처리 중...</p>
    </div>
  );
}
