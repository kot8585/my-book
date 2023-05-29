type User = {
  idx: Number;
  userId: String;
  email: String;
  name?: String;
  image?: String;
  type: String;
  createdAt: Date;
};

export type UserReactions = {
  likePosts: { postIdx: number }[];
  bookmarkPosts: { postIdx: number }[];
};
