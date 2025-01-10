import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { doc, getDoc } from "firebase/firestore";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Heart, Eye, Calendar, Clock, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { db } from "@/lib/firebase/firebase";
import { Post } from "@/types";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [tableOfContents, setTableOfContents] = useState<
    Array<{
      id: string;
      text: string;
      level: number;
    }>
  >([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("");

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

  useEffect(() => {
    if (!contentRef.current) return;

    const headings = contentRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6",
    );
    const toc = Array.from(headings).map((heading) => {
      const id = heading.textContent?.toLowerCase().replace(/\s+/g, "-") ?? "";
      heading.id = id;
      return {
        id,
        text: heading.textContent ?? "",
        level: parseInt(heading.tagName[1]),
      };
    });

    setTableOfContents(toc);
  }, [post]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0px -80% 0px",
      },
    );

    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [tableOfContents]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth < 1024;
      const headerOffset = isMobile ? 112 : 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset - 12;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsTocOpen(false);
  };

  const TocItem = ({ heading }: { heading: (typeof tableOfContents)[0] }) => (
    <button
      key={heading.id}
      onClick={() => scrollToSection(heading.id)}
      className={`group flex w-full items-center rounded-md py-2 text-left transition-all ${heading.level === 1 ? "font-bold" : "font-medium"} ${
        activeId === heading.id
          ? "bg-blue-50/80 font-semibold text-blue-600"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      } `}
      style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
    >
      <span
        className={`ml-3 text-sm transition-colors ${
          activeId === heading.id
            ? "font-semibold text-blue-600"
            : "group-hover:font-medium"
        } `}
      >
        {heading.text}
      </span>
    </button>
  );

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

              <div className="lg:hidden">
                <Sheet open={isTocOpen} onOpenChange={setIsTocOpen}>
                  <SheetTrigger asChild>
                    <Button
                      size="icon"
                      className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full shadow-lg"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[300px] p-6">
                    <SheetHeader>
                      <SheetTitle>목차</SheetTitle>
                    </SheetHeader>
                    <nav className="mt-6 flex max-h-[calc(100vh-6rem)] flex-col gap-1 overflow-y-auto">
                      {tableOfContents.map((heading) => (
                        <TocItem key={heading.id} heading={heading} />
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
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
                ref={contentRef}
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
                <nav className="flex flex-col gap-1">
                  {tableOfContents.map((heading) => (
                    <TocItem key={heading.id} heading={heading} />
                  ))}
                </nav>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
