"use client";
import { FeedType } from "@/components/feed/FeedTemplate";
import { FeedResponseType } from "@/model/post";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import useSWR from "swr";

export default function useFeedListQuery(feedType: FeedType) {
  const {
    data: feedList,
    isLoading,
    error,
  } = useQuery<FeedResponseType[], AxiosError>(
    ["posts", "list", feedType],
    () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_URL}/api/posts?feedType=${feedType}`)
        .then((response) => response.data),
    { initialData: [] }
  );

  // const {
  //   data: feedList,
  //   isLoading,
  //   error,
  // } = useSWR<FeedResponseType[]>(`/api/posts?feedType=${feedType}`);

  return { feedList, isLoading, error };
}
