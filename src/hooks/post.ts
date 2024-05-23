import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { PostDetailType } from "../model/post";

export default function usePost(postIdx: number) {
  const getPostDetailQuery = useQuery<PostDetailType, AxiosError>(
    ["posts", "detail", postIdx],
    () => axios.get(`/api/posts/${postIdx}`).then((response) => response.data),
    {
      cacheTime: 0,
      suspense: true,
    }
  );

  return { getPostDetailQuery };
}
