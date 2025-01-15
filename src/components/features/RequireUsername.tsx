import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface RequireUsernameProps {
  children: React.ReactNode;
}

export default function RequireUsername({ children }: RequireUsernameProps) {
  const { user, userData, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user && (!userData?.username || userData.username.trim() === "")) {
    if (!location.pathname.includes("/profile/setup")) {
      return (
        <Navigate to="/profile/setup" state={{ from: location }} replace />
      );
    }
  }

  return <>{children}</>;
}
