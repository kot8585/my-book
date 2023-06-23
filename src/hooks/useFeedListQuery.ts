import { FeedType } from "@/components/feed/FeedTemplate";
import { FeedResponseType } from "@/model/post";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export const useFeedListQuery = (feedType: FeedType) => {
  async function getPost() {
    return await axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/posts?feedType=${feedType}`)
      .then((response) => response.data);
  }

  const {
    data: feedList,
    isLoading,
    error,
    refetch,
    isRefetching,
  } = useQuery<FeedResponseType[], AxiosError>(["feeds", feedType], getPost, {
    suspense: true,
  });

  return { feedList, isLoading, error, refetch, isRefetching };
};
