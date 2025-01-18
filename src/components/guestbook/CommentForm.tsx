import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/guestbook";

interface CommentFormProps {
  onSubmit: (content: string, isSecret: boolean) => void;
  initialContent?: string;
  isEditing?: boolean;
  mentionedUser?: User | null;
}

export function CommentForm({
  onSubmit,
  initialContent = "",
  isEditing = false,
  mentionedUser = null,
}: CommentFormProps) {
  const [content, setContent] = useState(
    mentionedUser ? `@${mentionedUser.name} ${initialContent}` : initialContent,
  );
  const [isSecret, setIsSecret] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content, isSecret);
      if (!isEditing) {
        setContent("");
        setIsSecret(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={
          mentionedUser
            ? `@${mentionedUser.name}에게 답글 남기기...`
            : "방명록을 남겨주세요..."
        }
        className="w-full"
      />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="secret"
          checked={isSecret}
          onCheckedChange={(checked) => setIsSecret(checked as boolean)}
        />
        <label
          htmlFor="secret"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          비밀 댓글
        </label>
      </div>
      <Button type="submit">{isEditing ? "수정하기" : "작성하기"}</Button>
    </form>
  );
}
