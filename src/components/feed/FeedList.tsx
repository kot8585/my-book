import { FeedType } from "@/app/feed/page";
import { useFeedListQuery } from "@/hooks/useFeedListQuery";
import LoadingSpinner from "../common/LoadingSpinner";
import ShowMessage from "../common/ShowMessage";
import FeedCard from "./FeedCard";
import { ErrorBoundary } from "react-error-boundary";
import Error from "@/app/error";
import { QueryErrorResetBoundary } from "@tanstack/react-query";

export type Props = {
  feedType: FeedType;
};

export default function FeedList({ feedType }: Props) {
  const { feedList, isLoading, error, refetch, isRefetching } =
    useFeedListQuery(feedType);

  return (
    //근데 얘 더  상위에서 설정해야 잡을것 같은데
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary fallback={<Error error={error!} reset={refetch} />}>
          {feedList && (
            <ul className="w-full">
              {feedList &&
                feedList.map((feed) => <FeedCard key={feed.idx} feed={feed} />)}
            </ul>
          )}
          {!isLoading && !error && feedList?.length === 0 && (
            <ShowMessage message="작성된 피드가 없습니다" />
          )}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
