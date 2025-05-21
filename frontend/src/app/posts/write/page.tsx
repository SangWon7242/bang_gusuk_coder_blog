"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "@monaco-editor/react";

export default function WritePage() {
  const router = useRouter();
  const [content, setContent] = useState("// 여기에 코드를 작성하세요");
  const [title, setTitle] = useState("");

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setContent(value);
    }
  };

  // 취소 핸들러 추가
  const handleCancel = () => {
    const confirmed = window.confirm("작성을 취소하시겠습니까?"); // 선택적: 확인 대화상자 표시
    if (confirmed) {
      router.push("/"); // 루트 페이지로 이동
    }
  };

  // 저장 핸들러 추가
  const handleSave = () => {
    // 제목이 비어있는지 확인
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    // 기본 텍스트를 제외한 실제 내용이 있는지 확인
    const defaultContent = "// 여기에 코드를 작성하세요";
    if (!content.trim() || content === defaultContent) {
      alert("내용을 입력해주세요.");
      return;
    }

    // 여기에 실제 저장 로직 구현
    console.log({
      title,
      content,
    });

    // 저장 성공 후 처리
    alert("저장되었습니다.");
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title} // title 상태 연결
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 text-xl border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="h-[600px] border border-gray-300 rounded-md overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={content}
          onChange={handleEditorChange}
          theme="vs-white"
          options={{
            fontSize: 16,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            lineNumbers: "on",
            folding: true,
            foldingHighlight: true,
            foldingStrategy: "auto",
            showFoldingControls: "always",
            formatOnPaste: true,
            formatOnType: true,
            padding: { top: 20, bottom: 20 },
          }}
        />
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={handleCancel}
          className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
        >
          취소
        </button>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          저장
        </button>
      </div>
    </div>
  );
}
