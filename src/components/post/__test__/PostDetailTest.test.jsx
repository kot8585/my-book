import { withQueryClient } from "@/test/utils";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import PostDetail from "../PostDetail";
import { editPostData, postDetailData } from "./MswHandlers";

const server = setupServer(
  rest.get(`/api/posts/3`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(postDetailData));
  })
);

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("PostDetail - CreateComment", () => {
  it("코멘트를 작성하면 보여야한다 - 근데 create는 어떻게 테스트..?", async () => {});
});

describe("PostDetail", () => {
  beforeAll(() => {
    server.listen();
    useParams.mockReturnValue({ postIdx: 3 });
    useRouter.mockReturnValue({ push: () => {} });
    useSession.mockReturnValue({
      data: {
        user: {
          idx: 1,
        },
      },
    });
  });

  afterAll(() => server.close());

  it("포스트와 댓글내용들, 좋아요 갯수, 북마크 갯수, 댓글 개수가 정상적으로 나와야 한다.", async () => {
    render(withQueryClient(<PostDetail />));

    expect(await screen.findByText(/타이틀 있어/i)).toBeInTheDocument();
    expect(await screen.findByText("책이 재미있어요")).toBeInTheDocument();
    //like 개수
    expect(await screen.findByText("10")).toBeInTheDocument();
    //comment 개수
    expect(await screen.findByText("20")).toBeInTheDocument();
  });

  it("포스트 작성자일 경우 ThreeDotsButton이 보여야한다. - 이건 어케하는지 모르겠다", async () => {});

  it("수정된 포스트일 경우 (수정됨)이 보여야 한다.", async () => {
    server.use(
      rest.get(`/api/posts/3`, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(editPostData));
      })
    );

    render(withQueryClient(<PostDetail />));

    expect(await screen.findByText(/타이틀 있어/i)).toBeInTheDocument();
    expect(await screen.findByText(/(수정됨)/i)).toBeInTheDocument();
  });
});
