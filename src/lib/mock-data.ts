import { Post, Category } from "@/types";

export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "React 18의 새로운 기능 살펴보기",
    content: "React 18의 주요 기능에 대한 상세 내용...",
    excerpt:
      "React 18에서 추가된 주요 기능들과 성능 개선사항들을 자세히 알아봅니다.",
    categoryId: "1",
    tags: ["react", "javascript", "frontend"],
    thumbnailUrl: "https://picsum.photos/seed/1/400/250",
    viewCount: 1234,
    likeCount: 89,
    createdAt: new Date("2024-03-15"),
    updatedAt: new Date("2024-03-15"),
    authorId: "admin",
    published: true,
  },
  {
    id: "2",
    title: "TypeScript 5.0 업데이트 내용 정리",
    content: "TypeScript 5.0의 새로운 기능에 대한 상세 내용...",
    excerpt:
      "TypeScript 5.0의 새로운 기능과 개선된 타입 시스템에 대해 살펴봅니다.",
    categoryId: "2",
    tags: ["typescript", "javascript", "frontend"],
    thumbnailUrl: "https://picsum.photos/seed/2/400/250",
    viewCount: 856,
    likeCount: 76,
    createdAt: new Date("2024-03-14"),
    updatedAt: new Date("2024-03-14"),
    authorId: "admin",
    published: true,
  },
  {
    id: "3",
    title: "Next.js 14로 시작하는 서버 컴포넌트",
    content: "Next.js 14의 서버 컴포넌트에 대한 상세 내용...",
    excerpt:
      "Next.js 14의 서버 컴포넌트를 활용한 효율적인 웹 애플리케이션 개발 방법을 소개합니다.",
    categoryId: "3",
    tags: ["nextjs", "react", "frontend"],
    thumbnailUrl: "https://picsum.photos/seed/3/400/250",
    viewCount: 2341,
    likeCount: 156,
    createdAt: new Date("2024-03-13"),
    updatedAt: new Date("2024-03-13"),
    authorId: "admin",
    published: true,
  },
  {
    id: "4",
    title: "JavaScript ES2024 신규 스펙 소개",
    content: "JavaScript ES2024의 새로운 기능에 대한 상세 내용...",
    excerpt:
      "2024년 새롭게 추가된 JavaScript 기능들과 실제 활용 사례를 알아봅니다.",
    categoryId: "4",
    tags: ["javascript", "frontend"],
    thumbnailUrl: "https://picsum.photos/seed/4/400/250",
    viewCount: 1567,
    likeCount: 123,
    createdAt: new Date("2024-03-12"),
    updatedAt: new Date("2024-03-12"),
    authorId: "admin",
    published: true,
  },
  {
    id: "5",
    title: "Firebase v10 실시간 데이터베이스 활용하기",
    content: "Firebase 실시간 데이터베이스에 대한 상세 내용...",
    excerpt:
      "Firebase의 실시간 데이터베이스를 활용한 효율적인 데이터 관리 방법을 소개합니다.",
    categoryId: "5",
    tags: ["firebase", "backend", "database"],
    thumbnailUrl: "https://picsum.photos/seed/5/400/250",
    viewCount: 987,
    likeCount: 67,
    createdAt: new Date("2024-03-11"),
    updatedAt: new Date("2024-03-11"),
    authorId: "admin",
    published: true,
  },
  {
    id: "6",
    title: "React Query로 서버 상태 관리하기",
    content: "React Query를 활용한 상태 관리에 대한 상세 내용...",
    excerpt:
      "React Query를 사용하여 효율적인 서버 상태 관리와 캐싱 전략을 구현해봅니다.",
    categoryId: "1",
    tags: ["react", "react-query", "frontend"],
    thumbnailUrl: "https://picsum.photos/seed/6/400/250",
    viewCount: 1432,
    likeCount: 98,
    createdAt: new Date("2024-03-10"),
    updatedAt: new Date("2024-03-10"),
    authorId: "admin",
    published: true,
  },
  {
    id: "7",
    title: "TypeScript의 고급 타입 활용법",
    content: "TypeScript의 고급 타입 시스템에 대한 상세 내용...",
    excerpt:
      "TypeScript의 고급 타입 기능을 활용한 타입 안전한 코드 작성 방법을 알아봅니다.",
    categoryId: "2",
    tags: ["typescript", "javascript", "frontend"],
    thumbnailUrl: "https://picsum.photos/seed/7/400/250",
    viewCount: 1876,
    likeCount: 145,
    createdAt: new Date("2024-03-09"),
    updatedAt: new Date("2024-03-09"),
    authorId: "admin",
    published: true,
  },
  {
    id: "8",
    title: "Next.js 미들웨어로 인증 구현하기",
    content: "Next.js 미들웨어를 활용한 인증 시스템에 대한 상세 내용...",
    excerpt:
      "Next.js의 미들웨어를 활용한 효율적인 인증 시스템 구현 방법을 소개합니다.",
    categoryId: "3",
    tags: ["nextjs", "react", "auth"],
    thumbnailUrl: "https://picsum.photos/seed/8/400/250",
    viewCount: 2198,
    likeCount: 167,
    createdAt: new Date("2024-03-08"),
    updatedAt: new Date("2024-03-08"),
    authorId: "admin",
    published: true,
  },
];

export const MOCK_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "React",
    description: "React 관련 게시글",
    order: 1,
    postCount: 15,
  },
  {
    id: "2",
    name: "TypeScript",
    description: "TypeScript 관련 게시글",
    order: 2,
    postCount: 12,
  },
  {
    id: "3",
    name: "Next.js",
    description: "Next.js 관련 게시글",
    order: 3,
    postCount: 8,
  },
  {
    id: "4",
    name: "JavaScript",
    description: "JavaScript 관련 게시글",
    order: 4,
    postCount: 20,
  },
  {
    id: "5",
    name: "Firebase",
    description: "Firebase 관련 게시글",
    order: 5,
    postCount: 5,
  },
];
