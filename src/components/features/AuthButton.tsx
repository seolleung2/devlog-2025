import { signInWithGoogle, signOutUser } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function AuthButton() {
  const { user } = useAuth();

  const handleAuth = async () => {
    try {
      if (user) {
        await signOutUser();
      } else {
        await signInWithGoogle();
      }
    } catch (error) {
      console.error(user ? "로그아웃 실패:" : "로그인 실패:", error);
    }
  };

  return (
    <Button onClick={handleAuth} variant="outline">
      {user ? "로그아웃" : "Google로 로그인"}
    </Button>
  );
}
