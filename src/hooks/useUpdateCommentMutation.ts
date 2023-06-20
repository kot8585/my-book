import { PostCommentType } from "@/model/comment";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useUpdateCommentMutation = () => {
  const queryClient = useQueryClient();

  const updateComment = useMutation(
    (editComment: Partial<PostCommentType>) => {
      return axios.put(
        `/api/posts/${editComment.postIdx}/comments/${editComment.idx}`,
        editComment
      );
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: ["posts", "detail", variables.postIdx],
        });
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "댓글 수정을 실패하였습니다."));
      },
    }
  );
  return { updateComment };
};
