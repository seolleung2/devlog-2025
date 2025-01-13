import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Post } from "@/types";

const DUMMY_POSTS: Post[] = Array.from({ length: 23 }, (_, i) => ({
  id: `post${i + 1}`,
  title: `게시글 제목 ${i + 1}`,
  content: `게시글 ${i + 1}의 전체 내용입니다.`,
  excerpt: `이것은 게시글 ${i + 1}의 요약입니다.`,
  categoryId: `category${Math.floor(Math.random() * 3) + 1}`,
  tags: ["React", "TypeScript", "JavaScript"].slice(
    0,
    Math.floor(Math.random() * 3) + 1,
  ),
  thumbnailUrl: `https://picsum.photos/seed/${i + 1}/200/300`,
  viewCount: Math.floor(Math.random() * 100),
  likeCount: Math.floor(Math.random() * 50),
  createdAt: {
    seconds: Math.floor(Date.now() / 1000) - i * 86400,
    nanoseconds: 0,
  },
  updatedAt: {
    seconds: Math.floor(Date.now() / 1000) - i * 43200,
    nanoseconds: 0,
  },
  authorId: `user${Math.floor(Math.random() * 5) + 1}`,
  published: true,
}));

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = DUMMY_POSTS.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(DUMMY_POSTS.length / postsPerPage);

  const handleRowClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  const formatDate = (
    timestamp: { seconds: number; nanoseconds: number } | undefined,
  ) => {
    return timestamp
      ? new Date(timestamp.seconds * 1000).toLocaleDateString()
      : "-";
  };

  return (
    <div className="container">
      <h1 className="mb-8 text-3xl font-bold">게시글 목록</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="py-2 font-semibold">제목</TableHead>
              <TableHead className="hidden py-2 font-semibold md:table-cell">
                요약
              </TableHead>
              <TableHead className="hidden w-[100px] py-2 font-semibold sm:table-cell">
                카테고리
              </TableHead>
              <TableHead className="hidden w-[150px] py-2 font-semibold lg:table-cell">
                작성자
              </TableHead>
              <TableHead className="hidden w-[150px] py-2 font-semibold lg:table-cell">
                작성일
              </TableHead>
              <TableHead className="hidden w-[150px] py-2 font-semibold xl:table-cell">
                업데이트일
              </TableHead>
              <TableHead className="hidden w-[100px] py-2 text-right font-semibold sm:table-cell">
                조회
              </TableHead>
              <TableHead className="w-[100px] py-2 text-right font-semibold">
                좋아요
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.map((post) => (
              <TableRow
                key={post.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(post.id)}
              >
                <TableCell className="py-2">
                  <div className="space-y-2">
                    <span className="line-clamp-1 font-medium">
                      {post.title}
                    </span>
                    <div className="text-sm text-muted-foreground md:hidden">
                      <p className="line-clamp-1">{post.excerpt}</p>
                    </div>
                    <div className="text-sm text-muted-foreground lg:hidden">
                      {post.authorId} · {formatDate(post.createdAt)}
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground hover:bg-muted/80"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="hidden py-2 text-sm text-muted-foreground md:table-cell">
                  <p className="line-clamp-1">{post.excerpt}</p>
                </TableCell>
                <TableCell className="hidden py-2 sm:table-cell">
                  <span className="rounded-lg bg-blue-50 px-2 py-1 text-sm text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:hover:bg-blue-500/20">
                    {post.categoryId}
                  </span>
                </TableCell>
                <TableCell className="hidden py-2 text-muted-foreground lg:table-cell">
                  {post.authorId}
                </TableCell>
                <TableCell className="hidden py-2 text-muted-foreground lg:table-cell">
                  {formatDate(post.createdAt)}
                </TableCell>
                <TableCell className="hidden py-2 text-muted-foreground xl:table-cell">
                  {formatDate(post.updatedAt)}
                </TableCell>
                <TableCell className="hidden py-2 text-right text-muted-foreground sm:table-cell">
                  {post.viewCount}
                </TableCell>
                <TableCell className="py-2 text-right font-medium">
                  {post.likeCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  isActive={currentPage === i + 1}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
