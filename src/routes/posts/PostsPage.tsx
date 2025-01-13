import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

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
import { Post } from "@/types";
import { db } from "@/lib/firebase/firebase";
import { stripHtmlTags } from "@/utils";

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const postsPerPage = 10;

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Post[];
    },
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexOfFirstPost, indexOfLastPost) ?? [];
  const totalPages = Math.ceil((posts?.length ?? 0) / postsPerPage);

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

  if (isLoading) {
    return (
      <div className="container">
        <div className="flex h-[400px] items-center justify-center">
          <div className="text-muted-foreground">로딩 중...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="mb-8 text-3xl font-bold">게시글 목록</h1>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead className="w-[360px] py-2 font-semibold">
                제목
              </TableHead>
              <TableHead className="hidden w-[200px] py-2 font-semibold md:table-cell">
                요약
              </TableHead>
              <TableHead className="hidden w-[100px] py-2 font-semibold sm:table-cell">
                카테고리
              </TableHead>
              <TableHead className="hidden w-[100px] py-2 font-semibold lg:table-cell">
                작성자
              </TableHead>
              <TableHead className="hidden w-[100px] py-2 font-semibold lg:table-cell">
                작성일
              </TableHead>
              <TableHead className="hidden w-[100px] py-2 font-semibold xl:table-cell">
                업데이트일
              </TableHead>
              <TableHead className="hidden w-[80px] py-2 text-right font-semibold sm:table-cell">
                조회
              </TableHead>
              <TableHead className="w-[80px] min-w-[80px] py-2 text-right font-semibold">
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
                <TableCell className="w-[360px] py-2">
                  <div className="space-y-2">
                    <span className="line-clamp-1 font-medium">
                      {post.title}
                    </span>
                    <div className="text-sm text-muted-foreground md:hidden">
                      <p className="line-clamp-1">
                        {stripHtmlTags(post.excerpt)}
                      </p>
                    </div>
                    <div className="text-sm text-muted-foreground lg:hidden">
                      도토리묵 · {formatDate(post.createdAt)}
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
                <TableCell className="hidden w-[200px] py-2 text-sm text-muted-foreground md:table-cell">
                  <p className="line-clamp-1">{stripHtmlTags(post.excerpt)}</p>
                </TableCell>
                <TableCell className="hidden w-[100px] py-2 sm:table-cell">
                  <span className="rounded-lg bg-primary/5 px-2 py-1 text-sm text-primary transition-colors hover:bg-primary/10">
                    {post.categoryId}
                  </span>
                </TableCell>
                <TableCell className="hidden w-[100px] py-2 text-muted-foreground lg:table-cell">
                  도토리묵
                </TableCell>
                <TableCell className="hidden w-[100px] py-2 text-muted-foreground lg:table-cell">
                  {formatDate(post.createdAt)}
                </TableCell>
                <TableCell className="hidden w-[100px] py-2 text-muted-foreground xl:table-cell">
                  {formatDate(post.updatedAt)}
                </TableCell>
                <TableCell className="hidden w-[80px] py-2 text-right text-muted-foreground sm:table-cell">
                  {post.viewCount}
                </TableCell>
                <TableCell className="w-[80px] min-w-[80px] py-2 text-right font-medium">
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
