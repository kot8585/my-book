import { CreateCommentType } from "@/model/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();

  const addComment = useMutation(
    (newComment: CreateCommentType) => {
      return axios.post(
        `/api/posts/${newComment.postIdx}/comments`,
        newComment
      );
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["posts", "detail", variables.postIdx],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return { addComment };
};
