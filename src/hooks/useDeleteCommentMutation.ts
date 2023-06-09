import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  const deleteComment = useMutation(
    ({ commentIdx, postIdx }: { commentIdx: number; postIdx: number }) => {
      return axios.delete(`/api/posts/${postIdx}/comments/${commentIdx}`);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          //TODO: postIdx 넣기
          //TODO: optimistic 처리
          queryKey: ["posts", "detail", variables.postIdx],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
  return { deleteComment };
};
