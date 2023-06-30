import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useLikePostListQuery = () => {
  const {
    data: likePosts,
    isLoading,
    error,
  } = useQuery(
    ["posts", "likePosts"],
    (): Promise<number[]> => axios.get(`/api/likes`).then((res) => res.data)
  );
  return { likePosts, isLoading, error };
};
