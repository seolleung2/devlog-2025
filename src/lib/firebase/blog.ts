import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  where,
} from "firebase/firestore";
import type { Post, Category } from "@/types";

// 인기 게시글 Top 5 가져오기
export async function getTopPosts(count: number = 5): Promise<Post[]> {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("published", "==", true),
      orderBy("viewCount", "desc"),
      limit(count),
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Post[];
  } catch (error) {
    console.error("인기 게시글 조회 실패:", error);
    throw error;
  }
}

// 최신 게시글 가져오기
export async function getLatestPosts(count: number = 5): Promise<Post[]> {
  try {
    const postsRef = collection(db, "posts");
    const q = query(
      postsRef,
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(count),
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
    })) as Post[];
  } catch (error) {
    console.error("최신 게시글 조회 실패:", error);
    throw error;
  }
}

// 모든 카테고리 가져오기
export async function getAllCategories(): Promise<Category[]> {
  try {
    const categoriesRef = collection(db, "categories");
    const q = query(categoriesRef, orderBy("order", "asc"));

    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return [];
    }

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];
  } catch (error) {
    console.error("카테고리 조회 실패:", error);
    throw error;
  }
}
