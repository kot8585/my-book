type User = {
  idx: number;
  userId: string;
  email: string;
  name?: string;
  image?: string;
  type: string;
  createdAt: Date;
};

export type UserReactions = {
  likePosts: { postIdx: number }[];
  bookmarkPosts: { postIdx: number }[];
};

export type UserFollowInfoType =
  | User & {
      followerCnt: number;
      followeeCnt: number;
      //
      follower: number[];
      followee: number[];
    };
