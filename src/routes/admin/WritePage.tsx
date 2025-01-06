import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WritePage() {
  return (
    <main className="container flex-1 py-10">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">새 글 작성</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline">임시저장</Button>
          <Button>발행하기</Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <div className="min-h-[500px]">마크다운 에디터 영역</div>
        </div>
      </Card>
    </main>
  );
}
