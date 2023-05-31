import { FeedType } from "@/app/feed/page";
import { FeedResponseType } from "@/model/post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useFeedListQuery = (feedType: FeedType) => {
  async function getPost(): Promise<FeedResponseType[]> {
    return await axios
      .get(`/api/posts?feedType=${feedType}`)
      .then((response) => response.data);
  }

  const {
    data: feedList,
    isLoading,
    error,
  } = useQuery(["feeds", feedType], getPost, {
    staleTime: 3 * 1000 * 60,
  });

  return { feedList, isLoading, error };
};
