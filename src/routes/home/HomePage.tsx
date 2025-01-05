import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const MOCK_POSTS = [
  {
    id: "1",
    title: "React 18의 새로운 기능 살펴보기",
    excerpt:
      "React 18에서 추가된 주요 기능들과 성능 개선사항들을 자세히 알아봅니다.",
    thumbnailUrl: "https://picsum.photos/seed/1/400/250",
    viewCount: 1234,
    likeCount: 89,
    createdAt: new Date("2024-03-15"),
    categoryId: "1",
  },
  {
    id: "2",
    title: "TypeScript 5.0 업데이트 내용 정리",
    excerpt:
      "TypeScript 5.0의 새로운 기능과 개선된 타입 시스템에 대해 살펴봅니다.",
    thumbnailUrl: "https://picsum.photos/seed/2/400/250",
    viewCount: 856,
    likeCount: 76,
    createdAt: new Date("2024-03-14"),
    categoryId: "2",
  },
  {
    id: "3",
    title: "Next.js 14로 시작하는 서버 컴포넌트",
    excerpt:
      "Next.js 14의 서버 컴포넌트를 활용한 효율적인 웹 애플리케이션 개발 방법을 소개합니다.",
    thumbnailUrl: "https://picsum.photos/seed/3/400/250",
    viewCount: 2341,
    likeCount: 156,
    createdAt: new Date("2024-03-13"),
    categoryId: "3",
  },
  {
    id: "4",
    title: "JavaScript ES2024 신규 스펙 소개",
    excerpt:
      "2024년 새롭게 추가된 JavaScript 기능들과 실제 활용 사례를 알아봅니다.",
    thumbnailUrl: "https://picsum.photos/seed/4/400/250",
    viewCount: 1567,
    likeCount: 123,
    createdAt: new Date("2024-03-12"),
    categoryId: "4",
  },
  {
    id: "5",
    title: "Firebase v10 실시간 데이터베이스 활용하기",
    excerpt:
      "Firebase의 실시간 데이터베이스를 활용한 효율적인 데이터 관리 방법을 소개합니다.",
    thumbnailUrl: "https://picsum.photos/seed/5/400/250",
    viewCount: 987,
    likeCount: 67,
    createdAt: new Date("2024-03-11"),
    categoryId: "5",
  },
  {
    id: "6",
    title: "React Query로 서버 상태 관리하기",
    excerpt:
      "React Query를 사용하여 효율적인 서버 상태 관리와 캐싱 전략을 구현해봅니다.",
    thumbnailUrl: "https://picsum.photos/seed/6/400/250",
    viewCount: 1432,
    likeCount: 98,
    createdAt: new Date("2024-03-10"),
    categoryId: "1",
  },
  {
    id: "7",
    title: "TypeScript의 고급 타입 활용법",
    excerpt:
      "TypeScript의 고급 타입 기능을 활용한 타입 안전한 코드 작성 방법을 알아봅니다.",
    thumbnailUrl: "https://picsum.photos/seed/7/400/250",
    viewCount: 1876,
    likeCount: 145,
    createdAt: new Date("2024-03-09"),
    categoryId: "2",
  },
  {
    id: "8",
    title: "Next.js 미들웨어로 인증 구현하기",
    excerpt:
      "Next.js의 미들웨어를 활용한 효율적인 인증 시스템 구현 방법을 소개합니다.",
    thumbnailUrl: "https://picsum.photos/seed/8/400/250",
    viewCount: 2198,
    likeCount: 167,
    createdAt: new Date("2024-03-08"),
    categoryId: "3",
  },
];

const MOCK_CATEGORIES = [
  { id: "1", name: "React", postCount: 15, order: 1 },
  { id: "2", name: "TypeScript", postCount: 12, order: 2 },
  { id: "3", name: "Next.js", postCount: 8, order: 3 },
  { id: "4", name: "JavaScript", postCount: 20, order: 4 },
  { id: "5", name: "Firebase", postCount: 5, order: 5 },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      {/* Hero 섹션 */}
      <section className="border-b bg-gradient-to-b from-background to-muted/20">
        <div className="container py-12 md:py-16">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              기술 블로그
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
              개발 여정과 기술적 인사이트를 공유합니다
            </p>
          </div>
        </div>
      </section>

      {/* 메인 컨텐츠 */}
      <div className="container py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 왼쪽: 인기글과 최신글 */}
          <div className="space-y-10 md:col-span-3">
            {/* 인기 게시글 섹션 */}
            <section className="relative">
              <h2 className="mb-6 text-2xl font-bold tracking-tight">
                인기 게시글
              </h2>
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-2 grid-rows-1 md:-ml-4">
                  {MOCK_POSTS.slice(0, 5).map((post) => (
                    <CarouselItem
                      key={post.id}
                      className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/3"
                    >
                      <Card className="h-full overflow-hidden">
                        <div className="flex h-full flex-col">
                          <div className="aspect-[16/10] overflow-hidden">
                            <img
                              src={post.thumbnailUrl}
                              alt=""
                              className="h-full w-full rounded-t-lg object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                          <CardContent className="flex flex-1 flex-col justify-between p-4">
                            <div className="space-y-2">
                              <Badge variant="outline" className="w-fit">
                                {
                                  MOCK_CATEGORIES.find(
                                    (c) => c.id === post.categoryId,
                                  )?.name
                                }
                              </Badge>
                              <h3 className="line-clamp-2 text-lg font-semibold">
                                {post.title}
                              </h3>
                              <p className="line-clamp-2 text-sm text-muted-foreground">
                                {post.excerpt}
                              </p>
                            </div>
                            <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
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
                              </div>
                              <time dateTime={post.createdAt.toISOString()}>
                                {post.createdAt.toLocaleDateString()}
                              </time>
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
              </Carousel>
            </section>

            <Separator className="my-8" />

            {/* 최신 게시글 섹션 */}
            <section>
              <h2 className="mb-6 text-2xl font-bold tracking-tight">
                최신 게시글
              </h2>
              <div className="grid gap-6">
                {/* 첫 번째 게시글 - 피쳐드 포스트 */}
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-2">
                      <div className="aspect-[16/10] md:aspect-auto">
                        <img
                          src={MOCK_POSTS[0].thumbnailUrl}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-col p-6">
                        <Badge variant="outline" className="mb-2 w-fit">
                          {
                            MOCK_CATEGORIES.find(
                              (c) => c.id === MOCK_POSTS[0].categoryId,
                            )?.name
                          }
                        </Badge>
                        <h3 className="line-clamp-2 text-2xl font-bold">
                          {MOCK_POSTS[0].title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-muted-foreground">
                          {MOCK_POSTS[0].excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
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
                              {MOCK_POSTS[0].viewCount}
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
                              {MOCK_POSTS[0].likeCount}
                            </span>
                          </div>
                          <time
                            dateTime={MOCK_POSTS[0].createdAt.toISOString()}
                          >
                            {MOCK_POSTS[0].createdAt.toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* 나머지 게시글 그리드 */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {MOCK_POSTS.slice(1, 7).map((post) => (
                    <Card
                      key={post.id}
                      className="flex flex-col overflow-hidden"
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
                          {
                            MOCK_CATEGORIES.find(
                              (c) => c.id === post.categoryId,
                            )?.name
                          }
                        </Badge>
                        <h3 className="line-clamp-2 text-lg font-semibold">
                          {post.title}
                        </h3>
                        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between pt-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
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
                          </div>
                          <time dateTime={post.createdAt.toISOString()}>
                            {post.createdAt.toLocaleDateString()}
                          </time>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* 오른쪽: 카테고리 메뉴 */}
          <div className="md:pt-14">
            <div className="sticky top-20 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>카테고리</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-1">
                  {MOCK_CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="ml-auto">
                        {category.postCount}
                      </Badge>
                    </button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
