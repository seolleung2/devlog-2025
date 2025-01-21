import { useState } from "react";
import { CommentForm } from "@/components/guestbook/CommentForm";
import { CommentItem } from "@/components/guestbook/CommentItem";
import { User, Comment } from "@/types/guestbook";

const currentUser: User = { id: "1", name: "방문자", isAdmin: false };
const blogOwner: User = { id: "0", name: "블로그 주인", isAdmin: true };
const initialComments: Comment[] = [
  {
    id: "1",
    content: "첫 번째 댓글입니다.",
    author: blogOwner,
    createdAt: new Date(),
    updatedAt: new Date(),
    isSecret: false,
    parentId: null,
    mentionedUser: null,
    likes: 0,
  },
];

export default function GuestbookPage() {
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const addComment = (
    content: string,
    isSecret: boolean,
    parentId: string | null = null,
    mentionedUser: User | null = null,
  ) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      content,
      author: currentUser,
      createdAt: new Date(),
      updatedAt: new Date(),
      isSecret,
      parentId,
      mentionedUser,
      likes: 0,
    };
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const editComment = (id: string, content: string, isSecret: boolean) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id
          ? { ...comment, content, isSecret, updatedAt: new Date() }
          : comment,
      ),
    );
  };

  const deleteComment = (id: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id),
    );
  };

  const likeComment = (id: string) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment,
      ),
    );
  };

  const renderComments = (parentId: string | null = null) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <div key={comment.id}>
          <CommentItem
            comment={comment}
            currentUser={currentUser}
            onReply={(parentId, content, isSecret, mentionedUser) =>
              addComment(content, isSecret, parentId, mentionedUser)
            }
            onEdit={editComment}
            onDelete={deleteComment}
            onLike={likeComment}
          />
          {renderComments(comment.id)}
        </div>
      ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-full p-6">
        <h1 className="mb-6 text-center text-4xl font-extrabold tracking-tight text-gray-900">
          <span>방명록</span>
        </h1>
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <CommentForm
            onSubmit={(content, isSecret) => addComment(content, isSecret)}
          />
          <div className="mt-10 space-y-6 divide-y divide-gray-200">
            {renderComments()}
          </div>
        </div>
      </div>
    </div>
  );
}
