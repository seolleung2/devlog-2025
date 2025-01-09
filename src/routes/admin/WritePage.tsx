import { useRef, useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ImageIcon, X } from "lucide-react";
import { Editor } from "@toast-ui/react-editor";
import { useNavigate } from "react-router-dom";

import { storage } from "@/lib/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TagInput from "@/components/features/TagInput";
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
import { createPost } from "@/lib/firebase/post";

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
  const { user } = useAuth();
  const navigate = useNavigate();

  const uid = user?.uid;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [showThumbnailDialog, setShowThumbnailDialog] = useState(false);
  const { toast } = useToast();
  const [isPublishing, setIsPublishing] = useState(false);

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

  const handlePublish = async () => {
    if (!uid) {
      toast({
        variant: "destructive",
        title: "인증 오류",
        description: "로그인이 필요합니다.",
      });
      return;
    }

    if (!title.trim()) {
      toast({
        variant: "destructive",
        title: "제목을 입력해주세요.",
        duration: 2000,
      });
      return;
    }

    if (!category) {
      toast({
        variant: "destructive",
        title: "카테고리를 선택해주세요.",
        duration: 2000,
      });
      return;
    }

    const editorInstance = editorRef.current?.getInstance();
    const content = editorInstance?.getHTML();

    if (!content?.trim()) {
      toast({
        variant: "destructive",
        title: "내용을 입력해주세요.",
        duration: 2000,
      });
      return;
    }

    try {
      setIsPublishing(true);

      // 썸네일 파일 가져오기 (base64 -> File 객체로 변환)
      let thumbnailFile: File | undefined;
      if (thumbnail) {
        const response = await fetch(thumbnail);
        const blob = await response.blob();
        thumbnailFile = new File([blob], "thumbnail.jpg", {
          type: "image/jpeg",
        });
      }

      const postId = await createPost({
        title: title.trim(),
        content,
        categoryId: category,
        tags,
        thumbnailFile,
        authorId: uid,
      });

      toast({
        title: "포스트가 발행되었습니다.",
        description: "작성하신 글이 성공적으로 발행되었습니다.",
        duration: 3000,
      });

      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error("Error publishing post:", error);
      toast({
        variant: "destructive",
        title: "발행 실패",
        description: "포스트 발행 중 오류가 발생했습니다. 다시 시도해주세요.",
        duration: 3000,
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleImageUpload = async (
    blob: Blob | File,
    // eslint-disable-next-line no-unused-vars
    callback: (url: string, altText: string) => void,
  ) => {
    try {
      const validImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
      ];

      const fileType = (blob as File).type;
      if (!validImageTypes.includes(fileType)) {
        toast({
          variant: "destructive",
          title: "지원하지 않는 이미지 형식입니다.",
          description: "JPG, JPEG, PNG, GIF, WEBP 형식만 지원합니다.",
          duration: 3000,
        });
        return;
      }

      const file = blob as File;
      const fileExtension =
        file.name.split(".").pop() || fileType.split("/")[1];
      const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExtension}`;
      const altText = file.name.split(".")[0];

      const storageRef = ref(storage, `posts/${fileName}`);
      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);

      callback(downloadURL, altText);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        variant: "destructive",
        title: "이미지 업로드 실패",
        description: "잠시 후 다시 시도해주세요.",
        duration: 3000,
      });
    }
  };

  const toolbarItems = isDesktop
    ? [
        ["heading", "bold", "italic"],
        ["hr"],
        ["image", "link"],
        ["ul", "ol"],
        ["code", "codeblock"],
        ["table", "strike"],
        ["quote"],
      ]
    : [["heading", "bold"], ["image", "link"], ["ul", "ol"], ["code"]];

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
            <Button
              onClick={handlePublish}
              className="sm:flex-none"
              disabled={isPublishing}
            >
              {isPublishing ? "발행 중..." : "발행하기"}
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
                  className="group relative h-full cursor-pointer overflow-hidden rounded-md border border-input hover:bg-accent"
                  onClick={() => setShowThumbnailDialog(true)}
                >
                  <img
                    src={thumbnail}
                    alt="썸네일 미리보기"
                    className="h-full w-full rounded-md object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeThumbnail();
                    }}
                    className="absolute right-2 top-2 rounded-md bg-background/80 p-1 text-muted-foreground hover:bg-background hover:text-foreground"
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
          height="calc(100vh - 280px)"
          initialEditType="markdown"
          useCommandShortcut={true}
          hooks={{
            addImageBlobHook: handleImageUpload,
          }}
          toolbarItems={toolbarItems}
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
