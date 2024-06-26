"use client";

import usePosts from "@/hooks/posts";
import ShowMessage from "../common/ShowMessage";
import FeedCard from "./FeedCard";
import { FeedType } from "./FeedTemplate";

export type Props = {
  feedType: FeedType;
};

export default function FeedList({ feedType }: Props) {
  const {
    postListQuery: { data: feedList, isLoading, error },
  } = usePosts(feedType);

  return (
    <ul className="w-full h-full pb-14">
      {feedList &&
        feedList.map((feed) => (
          <FeedCard key={feed.idx} feed={feed} feedType={feedType} />
        ))}
      {!isLoading && !error && feedList?.length === 0 && (
        <ShowMessage message="작성된 피드가 없습니다" />
      )}
    </ul>
  );
}
