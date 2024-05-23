import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useBookMarkList() {
  const queryKey = ["posts", "bookmarkPosts"];

  const useBookMarkPostListQuery = useQuery<number[]>(queryKey, () =>
    axios.get(`/api/bookmarks`).then((res) => res.data)
  );

  return { useBookMarkPostListQuery };
}
