import { useState, KeyboardEvent } from "react";
import type { Dispatch, SetStateAction } from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const KEYS = {
  ENTER: "Enter",
  BACKSPACE: "Backspace",
} as const;

interface TagInputProps {
  value: string[];
  onChange: Dispatch<SetStateAction<string[]>>;
  placeholder?: string;
  className?: string;
}

export default function TagInput({
  value,
  onChange,
  placeholder = "태그 입력",
  className,
}: TagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const isEmptyInput = !inputValue;
  const hasExistingTags = value.length > 0;

  const addTag = (newTag: string) => {
    const trimmedTag = newTag.trim();
    const isValidTag = trimmedTag && !value.includes(trimmedTag);

    if (isValidTag) {
      onChange((prev) => [...prev, trimmedTag]);
      setInputValue("");
    }
  };

  const removeLastTag = () => {
    if (isEmptyInput && hasExistingTags) {
      onChange((prev) => prev.slice(0, -1));
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYS.ENTER) {
      addTag(inputValue);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEYS.ENTER) {
      e.preventDefault();
    } else if (e.key === KEYS.BACKSPACE) {
      removeLastTag();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-wrap gap-1",
        "rounded-md border border-input bg-background",
        "h-9 items-center",
        className,
      )}
    >
      {value.map((tag) => (
        <Badge key={tag} variant="secondary" className="max-w-[150px] gap-1">
          <span className="truncate">{tag}</span>
          <button
            type="button"
            onClick={() => removeTag(tag)}
            className="hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder={value.length === 0 ? placeholder : ""}
        className="h-full min-w-[50px] flex-1 border-0 p-0 px-1 focus-visible:ring-0"
      />
    </div>
  );
}
