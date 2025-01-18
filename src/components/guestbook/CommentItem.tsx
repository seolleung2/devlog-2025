import { useState } from "react";
import { User, Comment } from "@/types/guestbook";
import { Button } from "@/components/ui/button";
import { CommentForm } from "./CommentForm";
import { ThumbsUp, MessageSquare, Edit, Trash } from "lucide-react";

interface CommentItemProps {
  comment: Comment;
  currentUser: User;
  onReply: (
    parentId: string,
    content: string,
    isSecret: boolean,
    mentionedUser: User,
  ) => void;
  onEdit: (id: string, content: string, isSecret: boolean) => void;
  onDelete: (id: string) => void;
  onLike: (id: string) => void;
}

export function CommentItem({
  comment,
  currentUser,
  onReply,
  onEdit,
  onDelete,
  onLike,
}: CommentItemProps) {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const canViewSecret =
    currentUser.isAdmin || currentUser.id === comment.author.id;
  const canEditDelete = currentUser.id === comment.author.id;

  if (comment.isSecret && !canViewSecret) {
    return <div className="rounded-lg bg-gray-100 p-4">비밀 댓글입니다.</div>;
  }

  return (
    <div
      className={`p-4 ${comment.parentId ? "ml-8 border-l-2" : ""} ${comment.isSecret ? "bg-yellow-50" : "bg-white"}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-bold">{comment.author.name}</p>
          <p className="text-sm text-gray-500">
            {comment.createdAt.toLocaleString()}
          </p>
        </div>
        {canEditDelete && (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onDelete(comment.id)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <CommentForm
          onSubmit={(content, isSecret) => {
            onEdit(comment.id, content, isSecret);
            setIsEditing(false);
          }}
          initialContent={comment.content}
          isEditing={true}
        />
      ) : (
        <div className="mt-2">
          {comment.mentionedUser && (
            <span className="font-semibold text-blue-600">
              @{comment.mentionedUser.name}{" "}
            </span>
          )}
          <p className="inline">{comment.content}</p>
        </div>
      )}

      <div className="mt-4 flex space-x-4">
        <Button variant="outline" size="sm" onClick={() => onLike(comment.id)}>
          <ThumbsUp className="mr-2 h-4 w-4" />
          {comment.likes}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsReplying(!isReplying)}
        >
          <MessageSquare className="mr-2 h-4 w-4" />
          답글
        </Button>
      </div>

      {isReplying && (
        <div className="mt-4">
          <CommentForm
            onSubmit={(content, isSecret) => {
              onReply(comment.id, content, isSecret, comment.author);
              setIsReplying(false);
            }}
            mentionedUser={comment.author}
          />
        </div>
      )}
    </div>
  );
}
