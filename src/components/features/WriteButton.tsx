import { useLocation, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function WriteButton() {
  const navigate = useNavigate();
  const { isAdmin, loading } = useAuth();
  const { pathname } = useLocation();
  if (loading || !isAdmin || (isAdmin && pathname.includes("admin/write"))) {
    return null;
  }

  return (
    <Button
      variant="default"
      size="icon"
      className="fixed bottom-16 right-48 z-50 h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105"
      onClick={() => navigate("/admin/write")}
    >
      <Pencil className="h-6 w-6" />
      <span className="sr-only">글쓰기</span>
    </Button>
  );
}
