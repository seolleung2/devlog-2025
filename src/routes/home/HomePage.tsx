import { Separator } from "@/components/ui/separator";
import { PopularPosts } from "@/components/home/PopularPosts";
import { RecentPosts } from "@/components/home/RecentPosts";
import { CategoryList } from "@/components/home/CategoryList";
import { MOCK_POSTS, MOCK_CATEGORIES } from "@/lib/mock-data";

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
            <PopularPosts
              posts={MOCK_POSTS.slice(0, 5)}
              categories={MOCK_CATEGORIES}
            />
            <Separator className="my-8" />
            <RecentPosts />
          </div>

          {/* 오른쪽: 카테고리 메뉴 */}
          <div className="md:pt-14">
            <CategoryList categories={MOCK_CATEGORIES} />
          </div>
        </div>
      </div>
    </main>
  );
}
