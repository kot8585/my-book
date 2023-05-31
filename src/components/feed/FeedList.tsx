import { FeedType } from "@/app/feed/page";
import { useFeedListQuery } from "@/hooks/useFeedListQuery";
import LoadingSpinner from "../common/LoadingSpinner";
import ShowMessage from "../common/ShowMessage";
import FeedCard from "./FeedCard";

export type Props = {
  feedType: FeedType;
};

export default function FeedList({ feedType }: Props) {
  const { feedList, isLoading, error } = useFeedListQuery(feedType);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {feedList && (
        <ul className="w-full">
          {feedList &&
            feedList.map((feed) => <FeedCard key={feed.idx} feed={feed} />)}
        </ul>
      )}
      {!isLoading && !error && feedList?.length === 0 && (
        <ShowMessage message="작성된 피드가 없습니다" />
      )}
    </>
  );
}
