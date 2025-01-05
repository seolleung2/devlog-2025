import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export async function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;

  const adminDoc = await getDoc(doc(db, "settings", "admins"));
  if (!adminDoc.exists()) return false;

  const { emails } = adminDoc.data();
  return emails.includes(email);
}
