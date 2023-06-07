import { render, screen, waitFor } from "@testing-library/react";
import FeedList from "../FeedList";
import {
  setupListDataHandler,
  setupEmptyDataHandler,
  setupErrorDataHandler,
} from "./MswHandlers";
import { withQueryClient } from "../../../test/utils";
import "@testing-library/jest-dom";

describe("FeedList - ListData", () => {
  beforeEach(() => setupListDataHandler());

  it("FeedList 데이터를 보여줘야 한다", async () => {
    render(withQueryClient(<FeedList feedType={"ALL"} />));

    const title = screen.findByText("재밌는 책이지");
    const content = screen.findByText("'나중에'라는 뜻을 지닌 접두사");
    waitFor(() => {
      expect(title).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });
});

describe("FeedList - EmptyData", () => {
  beforeEach(() => setupEmptyDataHandler());

  it("FeedList 데이터가 비어있으면 '작성된 피드가 없다'는 메세지가 나와야 한다.", async () => {
    render(withQueryClient(<FeedList feedType={"ALL"} />));

    waitFor(() => {
      expect("작성된 피드가 없습니다").toBeInTheDocument();
    });
  });
});

describe("FeedList - Error", () => {
  beforeEach(() => setupErrorDataHandler());

  it("에러가 응답되었을 경우 에러 컴포넌트를 보여줘야 한다.", async () => {
    render(withQueryClient(<FeedList feedType={"ALL"} />));

    waitFor(() => {
      expect("다시 시도").toBeInTheDocument();
    });
  });
});
