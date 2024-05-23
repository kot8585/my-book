import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useLikeList() {
  const useLikePostListQuery = useQuery(
    ["posts", "likePosts"],
    (): Promise<number[]> => axios.get(`/api/likes`).then((res) => res.data)
  );
  return { useLikePostListQuery };
}
