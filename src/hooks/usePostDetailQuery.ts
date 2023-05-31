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
    isLoading,
    error,
  } = useQuery(["posts", "detail", postIdx], getPost);

  return { detailPost, isLoading, error };
}
