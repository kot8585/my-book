import { PostCommentType } from "@/model/comment";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
        console.error(error);
      },
    }
  );
  return { updateComment };
};
