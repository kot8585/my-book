import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { PostDetailType } from "../model/post";

type Props = {
  postIdx: number;
};

export default function usePostDetailQuery({ postIdx }: Props) {
  const getPost: () => Promise<PostDetailType> = () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/posts/${postIdx}`)
      .then((response) => response.data);
  const {
    data: detailPost,
    error,
    isLoading,
  } = useQuery(["posts", "detail", postIdx], getPost, { suspense: true });

  return { detailPost, error, isLoading };
}
