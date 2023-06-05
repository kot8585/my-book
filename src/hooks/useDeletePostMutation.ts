import { Post } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  const deletePost = useMutation(
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
        console.error(error);
      },
    }
  );
  return { deletePost };
};
