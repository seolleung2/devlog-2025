import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { auth, provider, db } from "@/lib/firebase/firebase";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { User } from "@/types";

interface AuthButtonProps {
  variant?: "default" | "menu";
}

export default function AuthButton({ variant = "default" }: AuthButtonProps) {
  const { user, loading } = useAuth();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navigate = useNavigate();

  if (isDesktop === null || loading) {
    return null;
  }

  const createUserDocument = async (userId: string, email: string) => {
    try {
      const userRef = doc(db, "users", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const userData: User = {
          id: userId,
          email: email,
          username: "",
          createdAt: serverTimestamp(),
        };
        await setDoc(userRef, userData);
        return true;
      }

      const userData = userSnap.data() as User;
      return !userData.username;
    } catch (error) {
      console.error("Error creating user document:", error);
      throw error;
    }
  };

  const handleAuth = async () => {
    if (user) {
      await signOut(auth);
    } else {
      try {
        const result = await signInWithPopup(auth, provider);
        const { user: signedInUser } = result;

        if (signedInUser.email) {
          const needsUsername = await createUserDocument(
            signedInUser.uid,
            signedInUser.email,
          );

          setTimeout(() => {
            if (needsUsername) {
              navigate("/profile/setup");
            }
          }, 100);
        }
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  if (variant === "menu") {
    if (!user) return null;
    return (
      <button
        onClick={handleAuth}
        className="w-full px-4 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary"
      >
        로그아웃
      </button>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        <img
          src={user.photoURL || ""}
          alt="프로필"
          className="h-9 w-9 rounded-full border bg-muted"
        />
        {isDesktop && (
          <Button variant="ghost" size="sm" onClick={handleAuth}>
            로그아웃
          </Button>
        )}
      </div>
    );
  }

  return (
    <Button
      onClick={handleAuth}
      className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <svg className="h-4 w-4" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      <span>{!isDesktop ? "로그인" : "Google 로그인"}</span>
    </Button>
  );
}
