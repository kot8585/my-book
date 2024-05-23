import { CreateNoteType, FeedResponseType } from "@/model/post";
import { Post } from "@prisma/client";
import { UserBook } from "@/model/userBook";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FeedType } from "@/components/feed/FeedTemplate";

export default function usePosts(feedType: FeedType = "ALL") {
  const queryClient = useQueryClient();
  const router = useRouter();

  const postListQuery = useQuery<FeedResponseType[], AxiosError>(
    ["posts", "list", feedType],
    () =>
      axios
        .get(`/api/posts?feedType=${feedType}`)
        .then((response) => response.data)
  );

  const createPostMutation = useMutation(
    (newNote: CreateNoteType) => {
      return axios.post("/api/posts", newNote);
    },
    {
      onSuccess: ({ data }: AxiosResponse<UserBook>) => {
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
      onError(error, variables, context) {
        toast.error(getErrorMessage(error, "노트작성에 실패하였습니다."));
      },
    }
  );

  const updatePostMutation = useMutation(
    (editPost: Partial<Post>) => {
      return axios.put(`/api/posts/${editPost.idx}`, editPost);
    },
    {
      onSuccess: ({ data }: AxiosResponse<Post>) => {
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
        router.refresh();
        toast.info("글 수정을 완료하였습니다.");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "글 수정을 실패하였습니다."));
      },
    }
  );

  const deletePostMutation = useMutation(
    (postIdx: number) => {
      return axios.delete(`/api/posts/${postIdx}`);
    },
    {
      onSuccess: ({ data }: AxiosResponse<Post>) => {
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "글 삭제에 실패하였습니다."));
      },
    }
  );

  return {
    postListQuery,
    createPostMutation,
    updatePostMutation,
    deletePostMutation,
  };
}
