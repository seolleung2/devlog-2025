import {
  collection,
  addDoc,
  serverTimestamp,
  FieldValue,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { Post } from "@/types";
import { db, storage } from "./firebase";

interface CreatePostData {
  title: string;
  content: string;
  categoryId: string;
  tags: string[];
  thumbnailFile?: File;
  authorId: string;
}

export async function createPost({
  title,
  content,
  categoryId,
  tags,
  thumbnailFile,
  authorId,
}: CreatePostData): Promise<string> {
  try {
    let thumbnailUrl: string | undefined;
    if (thumbnailFile) {
      const storageRef = ref(
        storage,
        `thumbnails/${Date.now()}_${thumbnailFile.name}`,
      );
      await uploadBytes(storageRef, thumbnailFile);
      thumbnailUrl = await getDownloadURL(storageRef);
    }

    const excerpt =
      content.replace(/[#*`]/g, "").slice(0, 150) +
      (content.length > 150 ? "..." : "");

    const postData = {
      title,
      content,
      excerpt,
      categoryId,
      tags,
      ...(thumbnailUrl && { thumbnailUrl }),
      viewCount: 0,
      likeCount: 0,
      createdAt: serverTimestamp() as FieldValue,
      updatedAt: serverTimestamp() as FieldValue,
      authorId,
      published: true,
    } satisfies Omit<Post, "id" | "createdAt" | "updatedAt"> & {
      createdAt: FieldValue;
      updatedAt: FieldValue;
    };

    const docRef = await addDoc(collection(db, "posts"), postData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}
