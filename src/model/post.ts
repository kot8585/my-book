import { Prisma, UserBook } from "@prisma/client";
import { PostCommentType } from "./comment";
import { getPost } from "@/service/post";

export type PostType = {
  userIdx: number;
  isbn: string;
  idx: number;
  page: number;
  title?: string;
  content: string;
  type: "NOTE" | "REVIEW";
  openType: "NONE" | "FOLLOW" | "ALL";
  createdAt: Date;
  updatedAt: Date | null;
  likeUsers: { userIdx: number }[];
  bookmarkUsers: { userIdx: number }[];
  _count: {
    likeUsers: number;
    bookmarkUsers: number;
    comments: number;
  };
};

export type OnlyPost = Omit<PostType, "bookMarkUserIdx" | "likeUserIdx">;

export type FeedResponseType = {
  user: {
    image?: string;
    name: string;
  };
  userBook: FeedBookInfoType;
} & PostType;

export type PostDetailType = Prisma.PromiseReturnType<typeof getPost>;

export type FeedBookInfoType = Partial<UserBook>;

export type CreateNoteType = Pick<
  PostType,
  "userIdx" | "type" | "openType" | "page" | "content" | "isbn"
>;
