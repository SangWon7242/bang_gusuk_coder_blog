"use client";
import Image from "next/image";
import Link from "next/link";

import { useEffect } from "react";

const handleKakaoLogin = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;

  if (!REST_API_KEY || !REDIRECT_URI) {
    console.error("Required environment variables are not defined");
    return;
  }

  const kakaoToken = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  window.location.href = kakaoToken;
};

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <button onClick={handleKakaoLogin} className="cursor-pointer">
        <Image
          src="/images/kakao_login_medium_narrow.png"
          alt="카카오 로그인"
          width={250}
          height={50}
          priority // 로그인 버튼은 중요한 요소이므로 우선 로딩
          quality={100} // 이미지 품질을 최대로 설정
        />
      </button>
    </div>
  );
}
