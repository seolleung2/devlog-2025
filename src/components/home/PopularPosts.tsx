import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import PostCardSkeleton from "../common/PostCardSkeleton";
import { stripHtmlTags } from "@/utils";
import { Post } from "@/types";
import { Timestamp } from "firebase/firestore";
import { FileText } from "lucide-react";

interface PopularPostsProps {
  posts: Post[];
  isLoading: boolean;
}

const DEFAULT_THUMBNAIL = "/src/assets/default-thumbnail.jpg";

export function PopularPosts({ posts, isLoading }: PopularPostsProps) {
  if (isLoading) {
    return <PostCardSkeleton title="인기 게시글" count={3} />;
  }

  if (!posts?.length) {
    return (
      <section className="relative">
        <h2 className="mb-6 text-2xl font-bold tracking-tight">인기 게시글</h2>
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg bg-muted/50">
          <FileText className="h-12 w-12 text-muted-foreground/50" />
          <p className="text-muted-foreground">게시물이 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <h2 className="mb-6 text-2xl font-bold tracking-tight">인기 게시글</h2>

      {/* 모바일 뷰 */}
      <div className="divide-y divide-border md:hidden">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/posts/${post.id}`}
            className="flex gap-4 py-4 transition-colors first:pt-0 last:pb-0 hover:bg-muted/50"
          >
            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
              <img
                src={post.thumbnailUrl || DEFAULT_THUMBNAIL}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="mb-1 flex flex-wrap gap-1">
                {post.tags?.length ? (
                  post.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline">태그없음</Badge>
                )}
              </div>
              <h3 className="mb-auto line-clamp-2 text-base font-semibold">
                {post.title}
              </h3>
              <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {post.viewCount}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {post.likeCount}
                </span>
                <time
                  dateTime={
                    post.createdAt instanceof Timestamp
                      ? new Date(post.createdAt.seconds * 1000).toISOString()
                      : ""
                  }
                  className="ml-auto"
                >
                  {post.createdAt instanceof Timestamp
                    ? new Date(
                        post.createdAt.seconds * 1000,
                      ).toLocaleDateString()
                    : ""}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 데스크크톱 뷰 */}
      <div className="hidden md:block">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-2 grid-rows-1 md:-ml-4">
            {posts.map((post) => (
              <CarouselItem
                key={post.id}
                className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
              >
                <Link to={`/posts/${post.id}`}>
                  <Card className="h-full overflow-hidden transition-colors hover:bg-muted/50">
                    <div className="flex h-full flex-col">
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={post.thumbnailUrl || DEFAULT_THUMBNAIL}
                          alt=""
                          className="h-full w-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <CardContent className="flex flex-1 flex-col p-4">
                        <div className="mb-2 flex flex-wrap gap-1">
                          {post.tags?.length ? (
                            post.tags.map((tag) => (
                              <Badge key={tag} variant="outline">
                                {tag}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="outline">태그없음</Badge>
                          )}
                        </div>
                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
                          {post.title}
                        </h3>
                        <p className="mb-auto line-clamp-2 text-sm text-muted-foreground">
                          {stripHtmlTags(post.excerpt)}
                        </p>
                        <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                            {post.viewCount}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            {post.likeCount}
                          </span>
                          <time
                            dateTime={
                              post.createdAt instanceof Timestamp
                                ? new Date(
                                    post.createdAt.seconds * 1000,
                                  ).toISOString()
                                : ""
                            }
                            className="ml-auto"
                          >
                            {post.createdAt instanceof Timestamp
                              ? new Date(
                                  post.createdAt.seconds * 1000,
                                ).toLocaleDateString()
                              : ""}
                          </time>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
        </Carousel>
      </div>
    </section>
  );
}
