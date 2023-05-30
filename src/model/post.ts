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
  likeUsers: { userIdx: number }[];
  bookmarkUsers: { userIdx: number }[];
};

export type OnlyPost = Omit<PostType, "bookMarkUserIdx" | "likeUserIdx">;

export type FeedResponseType = {
  user: {
    image?: string;
    name: string;
  };
  userBook: FeedBookInfoType;
} & PostType;

export type FeedBookInfoType = {
  title: string;
  imageUrl: string;
  author: string;
  page?: number;
};

export type CreateNoteType = Pick<
  PostType,
  "userIdx" | "type" | "openType" | "page" | "content" | "isbn"
>;

export type PostDetailType = {
  user: {
    image?: string;
    name: string;
  };
  userBook: FeedBookInfoType;
  comments: CommentType[];
} & PostType;

export type CommentType = {
  idx: number;
  content: string;
  createdAt: Date;
  user: {
    name: string;
    image?: string;
  };
};
