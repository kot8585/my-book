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
  bookMarkUserIdx?: String;
  likeUserIdx?: String;
};

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
  "userIdx" | "type" | "openType" | "page" | "content"
>;
