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

interface Post {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  likeCount: number;
  categoryId: number;
  category: string;
  tags: string[];
  excerpt: string;
}

const DUMMY_POSTS: Post[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  title: `게시글 제목 ${i + 1}`,
  author: `작성자 ${i + 1}`,
  createdAt: new Date(2024, 0, i + 1).toLocaleDateString(),
  updatedAt: new Date(2024, 0, i + 2).toLocaleDateString(),
  viewCount: Math.floor(Math.random() * 100),
  likeCount: Math.floor(Math.random() * 50),
  categoryId: Math.floor(Math.random() * 3) + 1,
  category: ["개발", "AI", "일상"][Math.floor(Math.random() * 3)],
  tags: ["React", "TypeScript", "JavaScript"].slice(
    0,
    Math.floor(Math.random() * 3) + 1,
  ),
  excerpt: `이것은 게시글 ${i + 1}의 요약입니다.`,
}));

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 10;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = DUMMY_POSTS.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(DUMMY_POSTS.length / postsPerPage);

  const handleRowClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">게시글 목록</h1>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>제목</TableHead>
              <TableHead>요약</TableHead>
              <TableHead className="w-[100px]">카테고리</TableHead>
              <TableHead className="w-[150px]">작성자</TableHead>
              <TableHead className="w-[150px]">작성일</TableHead>
              <TableHead className="w-[150px]">업데이트일</TableHead>
              <TableHead className="w-[100px] text-right">조회</TableHead>
              <TableHead className="w-[100px] text-right">좋아요</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPosts.map((post) => (
              <TableRow
                key={post.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(post.id)}
              >
                <TableCell>
                  <div>
                    <span className="font-medium">{post.title}</span>
                    {post.tags.length > 0 && (
                      <div className="mt-1 flex gap-1">
                        {post.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {post.excerpt}
                </TableCell>
                <TableCell>
                  <span className="rounded-lg bg-primary/10 px-2 py-1 text-sm text-primary">
                    {post.category}
                  </span>
                </TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{post.createdAt}</TableCell>
                <TableCell>{post.updatedAt}</TableCell>
                <TableCell className="text-right">{post.viewCount}</TableCell>
                <TableCell className="text-right">{post.likeCount}</TableCell>
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
