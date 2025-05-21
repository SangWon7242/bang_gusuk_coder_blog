"use client";
import { useEffect, useState } from 'react';

export default function PostsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 데이터 로딩 로직
    const loadPosts = async () => {
      try {
        // API 호출 또는 데이터 로딩 로직
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">로딩중...</div>;
  }

  return (
    // 게시글 목록 렌더링
  );
}