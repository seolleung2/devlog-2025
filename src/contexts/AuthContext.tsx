import { createContext } from "react";
import { User } from "firebase/auth";
import type { User as FirestoreUser } from "@/types";

export interface AuthContextType {
  user: User | null;
  userData: FirestoreUser | null;
  loading: boolean;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  isAdmin: false,
});
