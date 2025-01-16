import { FieldValue, Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  categoryId: string;
  tags: string[];
  thumbnailUrl?: string;
  viewCount: number;
  likeCount: number;
  createdAt: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
  authorId: string;
  authorName: string;
  published: boolean;
}

export interface Category {
  id: string;
  name: string; // 카테고리 이름
  description?: string; // 카테고리 설명
  order: number; // 표시 순서
  postCount: number; // 해당 카테고리의 게시글 수
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatarUrl?: string;
  createdAt: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
}

export interface Comment {
  id: number;
  author: string;
  content: string;
  createdAt: string;
  replies: Reply[];
}

export interface Reply {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

export interface CommentFormData {
  author: string;
  content: string;
  createdAt: string;
}
