import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();

  const deleteComment = useMutation(
    ({ commentIdx, postIdx }: { commentIdx: number; postIdx: number }) => {
      return axios.delete(`/api/posts/${postIdx}/comments/${commentIdx}`);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: [
            "posts",
            "detail",
            variables.postIdx.toString(),
            "reactions",
          ],
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error(getErrorMessage(error, "댓글 삭제를 실패하였습니다."));
      },
    }
  );
  return { deleteComment };
};
