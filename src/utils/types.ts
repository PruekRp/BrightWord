import { Blog,User } from "@prisma/client";

export interface PostDetail {
    id: string;
    title: string;
    slug: string;
    thumbnail?: string;
    createdAt: string;
    content:string;
  }

export type SafeUser = Omit<User,"createAt"|"updatedAt"|"emailVerified"> & {
  createAt:string;
  updatedAt: string;
  emailVerified:string | null;
}

export type SafeBlogs = Omit<Blog,"createdAt"> & {
  createdAt: string;
}