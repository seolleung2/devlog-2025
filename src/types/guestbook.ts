export interface User {
  id: string;
  name: string;
  isAdmin: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  isSecret: boolean;
  parentId: string | null;
  mentionedUser: User | null;
  likes: number;
}
