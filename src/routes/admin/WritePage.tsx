import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Editor } from "@toast-ui/react-editor";
import { useMediaQuery } from "@/hooks/useMediaQuery";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

export default function WritePage() {
  const editorRef = useRef<Editor>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleSaveDraft = () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    console.log("임시저장:", content);
    // TODO: 임시저장 로직 구현
  };

  const handlePublish = () => {
    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getMarkdown();
    console.log("발행하기:", content);
    // TODO: 발행 로직 구현
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* 헤더 영역 */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-4">
          <h1 className="text-xl font-semibold sm:text-2xl">새 글 작성</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="ghost"
              onClick={handleSaveDraft}
              className="sm:flex-none"
            >
              임시저장
            </Button>
            <Button onClick={handlePublish} className="sm:flex-none">
              발행하기
            </Button>
          </div>
        </div>
      </div>

      {/* 에디터 영역 */}
      <div className="flex-1">
        <Editor
          ref={editorRef}
          initialValue=""
          previewStyle={isDesktop ? "vertical" : "tab"}
          height={isDesktop ? "calc(100vh - 234px)" : "calc(100vh - 234px)"}
          initialEditType="markdown"
          useCommandShortcut={true}
          toolbarItems={[
            ["heading", "bold", "italic"],
            ["hr"],
            ["image", "link"],
            ["ul", "ol"],
            ["code", "codeblock"],
            ...(isDesktop ? [["table", "strike"], ["quote"]] : []),
          ]}
        />
      </div>
    </main>
  );
}
