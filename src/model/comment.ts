export type CreateCommentType = {
  postIdx: number;
  userIdx: number;
  content: string;
};

export type DefaultCommentType = {
  postIdx: number;
  userIdx: number;
  content: string;
  idx: number;
  createdAt: Date;
  updatedAt: Date | null;
};

export type PostCommentType = {
  user: {
    name: string;
    image?: string;
  };
} & DefaultCommentType;
