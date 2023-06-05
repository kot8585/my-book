import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useBookMarkPostListQuery = () => {
  const {
    data: bookmarkPosts,
    isLoading,
    error,
  } = useQuery<number[]>(["posts", "bookmarkPosts"], () =>
    axios.get("/api/bookmarks").then((res) => res.data)
  );

  return { bookmarkPosts, isLoading, error };
};
