export interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string; // 글 미리보기
  categoryId: string; // 카테고리 참조
  tags: string[]; // 태그 목록
  thumbnailUrl?: string; // 썸네일 이미지 URL
  viewCount: number; // 조회수
  likeCount: number; // 좋아요 수
  createdAt: Date; // 작성일
  updatedAt: Date; // 수정일
  authorId: string; // 작성자 ID (관리자)
  published: boolean; // 발행 여부
}

export interface Category {
  id: string;
  name: string; // 카테고리 이름
  description?: string; // 카테고리 설명
  order: number; // 표시 순서
  postCount: number; // 해당 카테고리의 게시글 수
}
