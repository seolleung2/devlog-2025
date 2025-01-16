import { useState } from "react";

import CommentForm from "@/components/CommentForm";
import CommentCard from "@/components/CommentCard";
import { CommentFormData, Comment } from "@/types";

export default function GuestBook() {
  const [isWriting, setIsWriting] = useState<boolean>(false);
  const [comments, setComments] = useState<Comment[]>([]);

  const handleAddComment = (newComment: CommentFormData): void => {
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        ...newComment,
        replies: [],
      },
    ]);
    setIsWriting(false);
  };

  const handleAddReply = (commentId: number, reply: CommentFormData): void => {
    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, { id: Date.now(), ...reply }],
          };
        }
        return comment;
      }),
    );
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">방명록</h1>

      <button
        className="mb-6 rounded-lg bg-blue-500 px-6 py-2 text-white transition-colors hover:bg-blue-600"
        onClick={() => setIsWriting(true)}
      >
        방명록 작성하기
      </button>

      {isWriting && (
        <div className="mb-8">
          <CommentForm
            onSubmit={handleAddComment}
            onClose={() => setIsWriting(false)}
          />
        </div>
      )}

      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment}
            onAddReply={handleAddReply}
          />
        ))}
      </div>
    </div>
  );
}
