import { Post, Category } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface RecentPostsProps {
  posts: Post[];
  categories: Category[];
}

export function RecentPosts({ posts, categories }: RecentPostsProps) {
  const [featuredPost, ...restPosts] = posts;

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">최신 게시글</h2>
      <div className="space-y-6">
        {/* Featured Post */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="grid md:grid-cols-2">
              <div className="aspect-[16/10] md:aspect-auto">
                <img
                  src={featuredPost.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col p-6">
                <Badge variant="outline" className="mb-2 w-fit">
                  {
                    categories.find((c) => c.id === featuredPost.categoryId)
                      ?.name
                  }
                </Badge>
                <h3 className="line-clamp-2 text-2xl font-bold">
                  {featuredPost.title}
                </h3>
                <p className="mb-auto mt-2 line-clamp-3 text-muted-foreground">
                  {featuredPost.excerpt}
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
              className="flex gap-4 py-4 first:pt-0 last:pb-0 md:hidden"
            >
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={post.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col">
                <Badge variant="outline" className="mb-1 w-fit">
                  {categories.find((c) => c.id === post.categoryId)?.name}
                </Badge>
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
              className="hidden flex-col overflow-hidden md:flex"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.thumbnailUrl}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="flex flex-1 flex-col p-4">
                <Badge variant="outline" className="mb-2 w-fit">
                  {categories.find((c) => c.id === post.categoryId)?.name}
                </Badge>
                <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
                  {post.title}
                </h3>
                <p className="mb-auto line-clamp-2 text-sm text-muted-foreground">
                  {post.excerpt}
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
