import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBookMarkPostListQuery = () => {
  const {
    data: bookmarkPosts,
    isLoading,
    error,
  } = useQuery(
    ["posts", "bookmarkPosts"],
    (): Promise<number[]> => axios.get("/api/bookmarks").then((res) => res.data)
  );

  return { bookmarkPosts, isLoading, error };
};
