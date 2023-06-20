import { getErrorMessage } from "@/utils/getErrorMessage";
import { Post } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

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
        toast.error(getErrorMessage(error, "글 삭제에 실패하였습니다."));
      },
    }
  );
  return { deletePost };
};
