import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from "@toast-ui/react-editor";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import TagInput from "@/components/features/TagInput";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";

// 임시 카테고리 데이터
const CATEGORIES = [
  "React",
  "TypeScript",
  "JavaScript",
  "Next.js",
  "Firebase",
] as const;

export default function WritePage() {
  const editorRef = useRef<Editor>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSaveDraft = () => {
    // const editorInstance = editorRef.current?.getInstance();
    // const content = editorInstance?.getMarkdown();
    // console.log("임시저장:", { title, category, tags, content });
  };

  const handlePublish = () => {
    // const editorInstance = editorRef.current?.getInstance();
    // const content = editorInstance?.getMarkdown();
    // console.log("발행하기:", { title, category, tags, content });
  };

  return (
    <main className="flex flex-1 flex-col">
      {/* 헤더 영역 */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between gap-2">
          <h1 className="text-lg font-semibold">새 글 작성</h1>
          <div className="flex items-center gap-1.5 sm:gap-2">
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

      {/* 글 설정 영역 */}
      <div className="container pb-2 pt-1">
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="sm:flex-[2]"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="sm:w-[120px]">
              <SelectValue placeholder="카테고리" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <TagInput
            value={tags}
            onChange={setTags}
            placeholder="태그 입력"
            className="px-3 sm:flex-[3]"
          />
        </div>
      </div>

      {/* 에디터 영역 */}
      <div className="flex-1">
        <Editor
          ref={editorRef}
          initialValue=""
          previewStyle={isDesktop ? "vertical" : "tab"}
          height={isDesktop ? "calc(100vh - 280px)" : "calc(100vh - 280px)"}
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
