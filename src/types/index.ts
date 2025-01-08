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
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  updatedAt?: {
    seconds: number;
    nanoseconds: number;
  };
  authorId: string;
  published: boolean;
}

export interface Category {
  id: string;
  name: string; // 카테고리 이름
  description?: string; // 카테고리 설명
  order: number; // 표시 순서
  postCount: number; // 해당 카테고리의 게시글 수
}
