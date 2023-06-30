import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostDetailType } from "../model/post";

type Props = {
  postIdx: number;
};

export default function usePostDetailQuery({ postIdx }: Props) {
  const getPost: () => Promise<PostDetailType> = () =>
    axios.get(`/api/posts/${postIdx}`).then((response) => response.data);
  const {
    data: detailPost,
    error,
    isLoading,
  } = useQuery(["posts", "detail", postIdx], getPost, {
    cacheTime: 0,
    suspense: true,
  });

  return { detailPost, error, isLoading };
}
