import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Heart, Eye, Calendar, Clock } from "lucide-react";

import { db } from "@/lib/firebase/firebase";
import { Post } from "@/types";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost({ id: docSnap.id, ...docSnap.data() } as Post);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (!post)
    return (
      <div className="flex h-screen items-center justify-center">
        Post not found
      </div>
    );

  const sanitizerConfig = {
    ALLOWED_TAGS: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "img",
      "a",
      "ul",
      "ol",
      "li",
      "code",
      "pre",
      "strong",
      "em",
    ],
    KEEP_CONTENT: true,
    FORBID_EMPTY: true,
  };

  const sanitizedContent = DOMPurify.sanitize(post.content, sanitizerConfig)
    .replace(/<p><br><\/p>/g, "")
    .replace(/<p>\s*<\/p>/g, "")
    .replace(/<br\s*\/?>/g, "");

  const createdDate = new Date(post.createdAt.seconds * 1000);
  const formattedDate = format(createdDate, "PPP", { locale: ko });
  const formattedTime = format(createdDate, "a h:mm", { locale: ko });
  const formattedUpdateDate = post.updatedAt
    ? format(new Date(post.updatedAt.seconds * 1000), "PPP a h:mm", {
        locale: ko,
      })
    : null;

  return (
    <div className="min-h-screen">
      <main className="container mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,320px] xl:gap-12">
          <article className="overflow-hidden">
            <div className="">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="w-fit rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-600">
                  {post.categoryId}
                </span>
                <div className="flex items-center gap-6 text-gray-500">
                  <span className="flex items-center">
                    <Eye className="mr-1.5 h-[18px] w-[18px]" />
                    {post.viewCount || 0}
                  </span>
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="flex items-center transition-colors hover:text-rose-500"
                  >
                    <Heart
                      className={`h-[18px] w-[18px] ${
                        isLiked ? "fill-rose-500 text-rose-500" : ""
                      }`}
                    />
                    <span className="ml-1.5">{post.likeCount || 0}</span>
                  </button>
                </div>
              </div>

              <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                {post.title}
              </h1>

              <div className="mb-4 lg:hidden">
                <button
                  onClick={() => setIsTocOpen(!isTocOpen)}
                  className="flex w-full items-center justify-between rounded-lg bg-gray-50 p-3"
                >
                  <span className="font-medium">목차</span>
                  <span
                    className={`transform transition-transform ${isTocOpen ? "rotate-180" : ""}`}
                  >
                    ▼
                  </span>
                </button>
                {isTocOpen && (
                  <div className="mt-2 rounded-lg bg-white p-4 shadow-md">
                    <nav className="space-y-1">
                      <div className="text-gray-600">
                        목차 내용이 들어갈 자리입니다.
                      </div>
                    </nav>
                  </div>
                )}
              </div>

              <div className="mb-8 flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <span className="flex items-center">
                    <Calendar className="mr-1.5 h-4 w-4" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1.5 h-4 w-4" />
                    {formattedTime}
                  </span>
                </div>
                {formattedUpdateDate && (
                  <span className="text-xs text-gray-400">
                    최종 수정: {formattedUpdateDate}
                  </span>
                )}
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                className="prose prose-slate prose-headings:mb-3 prose-headings:font-semibold prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-bold prose-p:text-base prose-p:leading-relaxed prose-p:text-gray-600 prose-img:my-6 prose-img:rounded-lg prose-img:shadow-md max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              />

              <div className="mt-12 flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-slate-100 px-3.5 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="rounded-lg bg-gray-50 p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                  목차
                </h2>
                <nav className="space-y-2">
                  <div className="text-gray-600">
                    목차 내용이 들어갈 자리입니다.
                  </div>
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
