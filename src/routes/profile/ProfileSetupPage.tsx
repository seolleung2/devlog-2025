import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";

import { db } from "@/lib/firebase/firebase";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfileSetupPage() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !username.trim()) return;

    setIsLoading(true);
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        username: username.trim(),
        updatedAt: serverTimestamp(),
      });

      navigate("/");
    } catch (error) {
      console.error("Error updating username:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-md p-6">
      <h1 className="mb-6 text-2xl font-bold">프로필 설정</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="username" className="text-sm font-medium">
            사용자 이름
          </label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자 이름을 입력하세요"
            required
            minLength={2}
            maxLength={20}
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "저장 중..." : "저장"}
        </Button>
      </form>
    </div>
  );
}
