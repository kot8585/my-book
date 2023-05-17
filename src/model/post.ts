type Post = {
  userIdx: number;
  isbn: string;
  idx: number;
  page: number;
  title?: string;
  content: string;
  createdAt: Date;
  bookMarkUserIdx?: String;
  likeUserIdx?: String;
};

export type FeedResponseType = {
  user: {
    image?: string;
    name: string;
  };
  userBook: FeedBookInfo;
} & Post;

export type FeedBookInfo = {
  title: string;
  imageUrl: string;
  author: string;
  page?: number;
};
