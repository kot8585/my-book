type Post = {
  userIdx: number;
  bookIdx: string;
  idx: number;
  page: number;
  title?: string;
  content: string;
  createdAt: Date;
  bookMarkUserIdx?: String;
  likeUserIdx?: String;
};

export type FeedBookInfo = {
  title: string;
  imageUrl: string;
  author: string;
  publisher: string;
  page?: number;
};

export type FeedTotalPost = {
  user: {
    image?: string;
    name: string;
  };
  userBook: FeedBookInfo;
} & Post;
