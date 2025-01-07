import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Editor } from "@toast-ui/react-editor";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import TagInput from "@/components/features/TagInput";
import { ImageIcon, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [showThumbnailDialog, setShowThumbnailDialog] = useState(false);

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeThumbnail = () => {
    setThumbnail(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
          <div className="flex flex-[4] flex-col gap-2">
            <Input
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[120px]">
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
                className="flex-1 px-3"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="h-20">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                multiple={false}
                onChange={handleThumbnailSelect}
                className="hidden"
              />
              {thumbnail ? (
                <div
                  className="flex h-full cursor-pointer items-center gap-2 rounded-md border border-input bg-background px-3 hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setShowThumbnailDialog(true)}
                >
                  <div className="relative flex h-full flex-1 items-center">
                    <img
                      src={thumbnail}
                      alt="썸네일 미리보기"
                      className="max-h-[68px] w-auto rounded object-contain"
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeThumbnail();
                    }}
                    className="flex-shrink-0 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  className="h-full w-full gap-2"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-4 w-4" />
                  <span>썸네일</span>
                </Button>
              )}
            </div>
          </div>
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

      {/* 썸네일 미리보기 모달 */}
      <Dialog open={showThumbnailDialog} onOpenChange={setShowThumbnailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>썸네일 미리보기</DialogTitle>
          </DialogHeader>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <img
              src={thumbnail ?? ""}
              alt="썸네일 미리보기"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              이미지 변경
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                removeThumbnail();
                setShowThumbnailDialog(false);
              }}
            >
              삭제
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
