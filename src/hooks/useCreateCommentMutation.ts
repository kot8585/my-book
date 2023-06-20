import { CreateCommentType } from "@/model/comment";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

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
        toast.info("댓글이 정상적으로 작성되었습니다.");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "댓글 작성에 실패하였습니다."));
      },
    }
  );

  return { addComment };
};
