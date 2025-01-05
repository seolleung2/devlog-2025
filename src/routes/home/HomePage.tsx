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
  // ... 더 많은 목업 포스트
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
    <div className="container space-y-10 py-8">
      {/* Hero 섹션 */}
      <section className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">기술 블로그</h1>
        <p className="text-lg text-muted-foreground">
          개발 여정과 기술적 인사이트를 공유합니다
        </p>
      </section>

      {/* 메인 컨텐츠 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {/* 왼쪽: 인기글과 최신글 */}
        <div className="space-y-8 md:col-span-3">
          {/* 인기 게시글 섹션 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">인기 게시글</h2>
            <div className="grid gap-4">
              {MOCK_POSTS.slice(0, 3).map((post) => (
                <div key={post.id} className="flex gap-4 rounded-lg border p-4">
                  <img
                    src={post.thumbnailUrl}
                    alt=""
                    className="h-[125px] w-[200px] rounded-md object-cover"
                  />
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold">{post.title}</h3>
                    <p className="line-clamp-2 text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>조회수 {post.viewCount}</span>
                      <span>좋아요 {post.likeCount}</span>
                      <span>{post.createdAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 최신 게시글 섹션 */}
          <section>
            <h2 className="mb-4 text-2xl font-bold">최신 게시글</h2>
            <div className="grid gap-4">
              {MOCK_POSTS.slice(0, 5).map((post) => (
                <div key={post.id} className="rounded-lg border p-4">
                  <h3 className="mb-2 text-xl font-semibold">{post.title}</h3>
                  <p className="mb-2 line-clamp-2 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.createdAt.toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* 오른쪽: 카테고리 메뉴 */}
        <div className="space-y-6">
          <section className="sticky top-20">
            <h2 className="mb-4 text-xl font-bold">카테고리</h2>
            <div className="space-y-2">
              {MOCK_CATEGORIES.map((category) => (
                <div
                  key={category.id}
                  className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-accent"
                >
                  <span>{category.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {category.postCount}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
