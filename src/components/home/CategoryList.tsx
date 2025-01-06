import { Category } from "@/types";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className="sticky top-20 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>카테고리</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-1">
          {categories.map((category) => (
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
  );
}
