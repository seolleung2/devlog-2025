import AuthButton from "@/components/features/AuthButton";
import { Button } from "@/components/ui/button";
import { Rss, Search, Sun, Volume2, X } from "lucide-react";
import { useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const GENERAL_LINKS = [
  { label: "소개", href: "/about" },
  { label: "블로그", href: "/blog" },
  { label: "연락하기", href: "/contact" },
] as const;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)") ?? false;

  const DesktopNav = () => (
    <div className="flex items-center gap-6">
      <nav className="flex items-center gap-6">
        {GENERAL_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2 border-l pl-6">
        <ActionIcons />
        <AuthButton />
      </div>
    </div>
  );

  const MobileHeader = () => (
    <div className="flex h-14 items-center justify-between border-b">
      <Button
        variant="ghost"
        size="icon"
        className="h-9 w-9 rounded-full"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
        <span className="sr-only">메뉴</span>
      </Button>

      <ActionIcons />
    </div>
  );

  const ActionIcons = () => (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <Search className="h-4 w-4" />
        <span className="sr-only">검색</span>
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <Volume2 className="h-4 w-4" />
        <span className="sr-only">소리</span>
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <Sun className="h-4 w-4" />
        <span className="sr-only">테마</span>
      </Button>
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <Rss className="h-4 w-4" />
        <span className="sr-only">RSS</span>
      </Button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl">
        <div className={cn(!isDesktop && "px-4")}>
          <div className="flex h-14 items-center justify-between border-b md:h-16">
            <a
              href="/"
              className="text-lg font-semibold tracking-tight transition-colors hover:text-primary"
            >
              기술 블로그
            </a>

            {isDesktop ? <DesktopNav /> : <AuthButton />}
          </div>

          {!isDesktop && <MobileHeader />}
        </div>

        {!isDesktop && (
          <div
            className={`overflow-hidden transition-[height,opacity] duration-300 ease-in-out ${isMenuOpen ? "h-[180px] opacity-100" : "h-0 opacity-0"} `}
          >
            <nav className="flex flex-col p-4">
              {GENERAL_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-accent hover:text-primary"
                >
                  {link.label}
                </a>
              ))}
              <AuthButton variant="menu" />
              <div className="border-b pt-2" />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
