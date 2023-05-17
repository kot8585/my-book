import { FeedType } from "@/app/feed/page";
import { FeedResponseType } from "@/model/post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../common/LoadingSpinner";
import ShowMessage from "../common/ShowMessage";
import FeedCard from "./FeedCard";

type Props = {
  feedType: FeedType;
};

export default function FeedList({ feedType }: Props) {
  async function getPost(): Promise<FeedResponseType[]> {
    return await axios
      .get(`http://localhost:3000/api/posts?feedType=${feedType}`)
      .then((response) => response.data);
  }

  const {
    data: feedList,
    isLoading: loading,
    error,
  } = useQuery(["feeds", feedType], getPost);
  console.log("feedList : ", feedList);
  return (
    <>
      {loading && <LoadingSpinner />}
      {feedList && (
        <ul className="w-full">
          {feedList &&
            feedList.map((feed) => <FeedCard key={feed.idx} feed={feed} />)}
        </ul>
      )}
      {!loading && !error && !feedList && (
        <ShowMessage message="작성된 피드가 없습니다" />
      )}
    </>
  );
}
