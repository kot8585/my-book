import { Post } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();

  const editPost = useMutation(
    (editPost: Partial<Post>) => {
      return axios.put(`/api/posts/${editPost.idx}`, editPost);
    },
    {
      onSuccess: ({ data }: AxiosResponse<Post>) => {
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  return { editPost };
};
