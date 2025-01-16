import { useState } from "react";
import CommentForm from "./CommentForm";
import { Comment, CommentFormData } from "../types";

interface CommentCardProps {
  comment: Comment;
  onAddReply: (commentId: number, reply: CommentFormData) => void;
}

export default function CommentCard({ comment, onAddReply }: CommentCardProps) {
  const [isReplying, setIsReplying] = useState<boolean>(false);

  const handleAddReply = (reply: CommentFormData): void => {
    onAddReply(comment.id, reply);
    setIsReplying(false);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{comment.author}</h3>
          <p className="text-sm text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="mb-4 text-gray-700">{comment.content}</p>

      <button
        className="text-sm text-blue-500 hover:text-blue-600"
        onClick={() => setIsReplying(!isReplying)}
      >
        답글 달기
      </button>

      {isReplying && (
        <div className="mt-4">
          <CommentForm
            onSubmit={handleAddReply}
            onClose={() => setIsReplying(false)}
          />
        </div>
      )}

      <div className="ml-8 mt-4 space-y-4">
        {comment.replies.map((reply) => (
          <div key={reply.id} className="rounded-lg bg-gray-50 p-4">
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h4 className="font-semibold">{reply.author}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(reply.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-gray-700">{reply.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
