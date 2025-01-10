import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Post } from "@/types";

function getRecentPosts() {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, orderBy("createdAt", "desc"), limit(7));
  return getDocs(q);
}

const DEFAULT_THUMBNAIL = "/src/assets/default-thumbnail.jpg";

function stripHtmlTags(html: string) {
  if (!html) return "";

  const withoutImages = html.replace(
    /<img[^>]*>|<img.*?\/?>|\s*<img[^>]*src="[^"]*"[^>]*>/g,
    "",
  );

  const withoutFirebaseUrls = withoutImages.replace(
    /<img src="https:\/\/firebasestorage\.googleapis\.com[^"]*"[^>]*>/g,
    "",
  );

  const withoutPlainTextUrls = withoutFirebaseUrls.replace(
    /<img src="https:\/\/firebasestorage\.googleapis\.com[^"]*"/g,
    "",
  );

  const withoutUrls = withoutPlainTextUrls
    .replace(
      /<img src="https:\/\/firebasestorage\.googleapis\.com.*?(?=")/g,
      "",
    )
    .replace(/https:\/\/firebasestorage\.googleapis\.com[^\s]*/g, "")
    .replace(/<img src="/g, "");

  const withoutTags = withoutUrls.replace(/<[^>]*>/g, "");
  const decoded = withoutTags.replace(/&[^;]+;/g, " ");

  return decoded.replace(/\s+/g, " ").trim();
}

export function RecentPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handlePostClick = (postId: string) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await getRecentPosts();
        const postsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <RecentPostsSkeleton />;
  }

  const [featuredPost, ...restPosts] = posts;

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">최신 게시글</h2>
      <div className="space-y-6">
        {/* Featured Post */}
        <Card
          className="cursor-pointer overflow-hidden"
          onClick={() => handlePostClick(featuredPost.id)}
        >
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="aspect-[16/10] md:aspect-auto">
                <img
                  src={featuredPost.thumbnailUrl || DEFAULT_THUMBNAIL}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col p-6">
                <div className="mb-2 flex flex-wrap gap-2">
                  {featuredPost.tags?.length ? (
                    featuredPost.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline">태그없음</Badge>
                  )}
                </div>
                <h3 className="line-clamp-2 text-2xl font-bold">
                  {featuredPost.title}
                </h3>
                <p className="mb-auto mt-2 line-clamp-3 text-muted-foreground">
                  {stripHtmlTags(featuredPost.excerpt)}
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
                    {featuredPost.viewCount}
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
                    {featuredPost.likeCount}
                  </span>
                  <time
                    dateTime={new Date(
                      featuredPost.createdAt.seconds * 1000,
                    ).toISOString()}
                    className="ml-auto"
                  >
                    {new Date(
                      featuredPost.createdAt.seconds * 1000,
                    ).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rest Posts */}
        <div className="divide-y divide-border md:grid md:grid-cols-2 md:gap-6 md:divide-y-0 lg:grid-cols-3">
          {/* 모바일 뷰 */}
          {restPosts.map((post) => (
            <div
              key={post.id}
              className="flex cursor-pointer gap-4 py-4 first:pt-0 last:pb-0 md:hidden"
              onClick={() => handlePostClick(post.id)}
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
                    dateTime={new Date(
                      post.createdAt.seconds * 1000,
                    ).toISOString()}
                    className="ml-auto"
                  >
                    {new Date(
                      post.createdAt.seconds * 1000,
                    ).toLocaleDateString()}
                  </time>
                </div>
              </div>
            </div>
          ))}

          {/* 데스크톱 뷰 */}
          {restPosts.map((post) => (
            <Card
              key={post.id}
              className="hidden cursor-pointer flex-col overflow-hidden md:flex"
              onClick={() => handlePostClick(post.id)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.thumbnailUrl || DEFAULT_THUMBNAIL}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
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
                    dateTime={new Date(
                      post.createdAt.seconds * 1000,
                    ).toISOString()}
                    className="ml-auto"
                  >
                    {new Date(
                      post.createdAt.seconds * 1000,
                    ).toLocaleDateString()}
                  </time>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// 로딩 상태를 위한 스켈레톤 컴포넌트
export function RecentPostsSkeleton() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">최신 게시글</h2>
      <div className="space-y-6">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <Skeleton className="aspect-[16/10] md:aspect-auto" />
              <div className="flex flex-col space-y-4 p-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-20 w-full" />
                <div className="flex gap-3">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="ml-auto h-4 w-24" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
