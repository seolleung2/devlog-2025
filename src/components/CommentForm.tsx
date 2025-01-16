import { useState, FormEvent } from "react";
import { CommentFormData } from "../types";

interface CommentFormProps {
  onSubmit: (data: CommentFormData) => void;
  onClose: () => void;
}

export default function CommentForm({ onSubmit, onClose }: CommentFormProps) {
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!content.trim() || !author.trim()) return;

    onSubmit({
      author,
      content,
      createdAt: new Date().toISOString(),
    });
    setContent("");
    setAuthor("");
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow-md">
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="이름"
        className="mb-4 w-full rounded-lg border p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="방명록을 작성해주세요..."
        className="mb-4 h-32 w-full resize-none rounded-lg border p-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
        >
          취소
        </button>
        <button
          type="submit"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          작성하기
        </button>
      </div>
    </form>
  );
}
