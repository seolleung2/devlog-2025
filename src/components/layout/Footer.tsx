import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Volume2, Sun, Rss, Moon } from "lucide-react";
import { SiGithub, SiX, SiLinkedin } from "@icons-pack/react-simple-icons";

export default function Footer({
  toggleDarkMode,
  isDarkMode,
}: {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}) {
  return (
    <footer className="w-full border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="mx-auto grid max-w-7xl gap-12 pb-12 md:grid-cols-12">
          {/* About Section - 좌측 큰 영역 */}
          <div className="space-y-4 border-muted pr-8 md:col-span-5 md:border-r">
            <h2 className="text-xl font-bold tracking-tight">기술 블로그</h2>
            <p className="max-w-md leading-relaxed text-muted-foreground">
              개발 여정과 기술적 인사이트를 공유하는 공간입니다. 새로운 기술과
              경험을 함께 나누며 성장하고자 합니다.
            </p>
            <div className="flex items-center gap-4 text-muted-foreground">
              <a
                href="https://github.com"
                className="transition-colors hover:text-primary"
              >
                <SiGithub className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                className="transition-colors hover:text-primary"
              >
                <SiX className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                className="transition-colors hover:text-primary"
              >
                <SiLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation Sections - 우측 영역 */}
          <div className="md:col-span-7 md:pl-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              {/* Categories */}
              <div className="space-y-4">
                <h3 className="font-semibold">카테고리</h3>
                <ul className="space-y-3">
                  {["React", "TypeScript", "Next.js", "JavaScript"].map(
                    (category) => (
                      <li key={category}>
                        <a
                          href={`/blog?category=${category.toLowerCase()}`}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          {category}
                        </a>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              {/* General Links */}
              <div className="space-y-4">
                <h3 className="font-semibold">일반</h3>
                <ul className="space-y-3">
                  {[
                    { label: "소개", href: "/about" },
                    { label: "블로그", href: "/blog" },
                    { label: "연락하기", href: "/contact" },
                  ].map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        className="text-muted-foreground transition-colors hover:text-primary"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter Section */}
              <div className="col-span-2 space-y-4 md:col-span-1">
                <h3 className="font-semibold">뉴스레터</h3>
                <p className="text-sm text-muted-foreground">
                  새로운 글이 올라오면 가장 먼저 알려드립니다.
                </p>
                <form className="space-y-2">
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-background/50"
                  />
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    구독하기
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mx-auto max-w-7xl border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 광묵의 기술 블로그. All rights
              reserved.
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Search className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={toggleDarkMode}
              >
                {isDarkMode ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
              >
                <Rss className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
