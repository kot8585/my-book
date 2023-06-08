import { rest } from "msw";
import { server } from "../../../test/__mocks__/server";
import { NextResponse } from "next/server";

export const defaultPostDetailHandler = rest.get(
  `/api/posts/3`,
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postDetailData));
  }
);

export const setupDefaultPostDetailHandler = () => {
  return server.use(defaultPostDetailHandler);
};

export const setupEditDataHandler = () => {
  return server.use(
    rest.get(`/api/posts/3`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(editPostData));
    })
  );
};

export const setupEmptyDataHandler = () => {
  server.use(
    rest.get(`/api/posts/3`, (req, res, ctx) => {
      return res(ctx.status(200), ctx.json([]));
    })
  );
};

export const postDetailData = {
  userIdx: 1,
  isbn: "9791130689241",
  idx: 3,
  page: 0,
  title: "타이틀 있어",
  content: "책이 재미있어요",
  type: "MEMO",
  createdAt: "2023-05-21T10:29:19.541Z",
  updatedAt: null,
  openType: "NONE",
  user: {
    name: "꽃꽃",
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxYpFHyxWXY45u8EjJRbffvbhV2uninNhvJkPB3o=s96-c",
  },
  userBook: {
    title: "수상한 중고상점",
    categoryName: "일본소설",
    comment: "표지가 이뻐",
    imageUrl:
      "https://image.aladin.co.kr/product/30609/89/coversum/k052830610_1.jpg",
    author: "미치오 슈스케 지음, 김은모 옮김",
    publisher: "놀",
    type: "PAPER",
  },
  comments: [
    {
      idx: 1,
      content: "댓글을 작성했다",
      createdAt: "2023-05-27T16:42:53.918Z",
      user: {
        name: "꽃꽃",
        image:
          "https://lh3.googleusercontent.com/a/AGNmyxYpFHyxWXY45u8EjJRbffvbhV2uninNhvJkPB3o=s96-c",
      },
    },
  ],
  likeUsers: [
    {
      userIdx: 1,
    },
  ],
  bookmarkUsers: [],
  _count: {
    likeUsers: 10,
    bookmarkUsers: 0,
    comments: 20,
  },
};

export const editPostData = {
  userIdx: 1,
  isbn: "9791130689241",
  idx: 3,
  page: 0,
  title: "타이틀 있어",
  content: "바꿔요!",
  type: "MEMO",
  createdAt: "2023-05-21T10:29:19.541Z",
  updatedAt: "2023-05-22T10:29:19.541Z",
  openType: "NONE",
  user: {
    name: "꽃꽃",
    image:
      "https://lh3.googleusercontent.com/a/AGNmyxYpFHyxWXY45u8EjJRbffvbhV2uninNhvJkPB3o=s96-c",
  },
  userBook: {
    title: "수상한 중고상점",
    categoryName: "일본소설",
    comment: "표지가 이뻐",
    imageUrl:
      "https://image.aladin.co.kr/product/30609/89/coversum/k052830610_1.jpg",
    author: "미치오 슈스케 지음, 김은모 옮김",
    publisher: "놀",
    type: "PAPER",
  },
  comments: [
    {
      idx: 1,
      content: "댓글을 작성했다",
      createdAt: "2023-05-27T16:42:53.918Z",
      user: {
        name: "꽃꽃",
        image:
          "https://lh3.googleusercontent.com/a/AGNmyxYpFHyxWXY45u8EjJRbffvbhV2uninNhvJkPB3o=s96-c",
      },
    },
  ],
  likeUsers: [
    {
      userIdx: 1,
    },
  ],
  bookmarkUsers: [],
  _count: {
    likeUsers: 1,
    bookmarkUsers: 0,
    comments: 1,
  },
};
