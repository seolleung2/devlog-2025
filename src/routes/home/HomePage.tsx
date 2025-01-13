import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import { Separator } from "@/components/ui/separator";
import { CategoryList } from "@/components/home/CategoryList";
import { PopularPosts } from "@/components/home/PopularPosts";
import { RecentPosts } from "@/components/home/RecentPosts";
import { Post } from "@/types";
import { MOCK_CATEGORIES } from "@/lib/mock-data";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const postsQuery = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          limit(10),
        );
        const postsSnapshot = await getDocs(postsQuery);
        const postsData = postsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        setPosts(postsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const popularPosts = [...posts]
    .sort((a, b) => b.viewCount + b.likeCount - (a.viewCount + a.likeCount))
    .slice(0, 5);

  const recentPosts = posts.slice(0, 5);

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
            <PopularPosts posts={popularPosts} isLoading={loading} />
            <Separator className="my-8" />
            <RecentPosts posts={recentPosts} isLoading={loading} />
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
