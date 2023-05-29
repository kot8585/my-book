export type Post = {
  userIdx: number;
  isbn: string;
  idx: number;
  page: number;
  title?: string;
  content: string;
  type: "NOTE" | "REVIEW";
  openType: "NONE" | "FOLLOW" | "ALL";
  createdAt: Date;
  likeUsers: { userIdx: number }[];
  bookmarkUsers: { userIdx: number }[];
};

export type OnlyPost = Omit<Post, "bookMarkUserIdx" | "likeUserIdx">;

export type FeedResponseType = {
  user: {
    image?: string;
    name: string;
  };
  userBook: FeedBookInfoType;
} & Post;

export type FeedBookInfoType = {
  title: string;
  imageUrl: string;
  author: string;
  page?: number;
};

export type CreateNoteType = Pick<
  Post,
  "userIdx" | "type" | "openType" | "page" | "content" | "isbn"
>;

export type PostDetailType = {
  user: {
    image?: string;
    name: string;
  };
  userBook: FeedBookInfoType;
  comments: CommentType[];
} & Post;

export type CommentType = {
  idx: number;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    image?: string;
  };
};
