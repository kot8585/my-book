import { CreateCommentType, PostCommentType } from "@/model/comment";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useComment(postIdx: number | null) {
  const queryClient = useQueryClient();
  const queryKey = ["posts", "detail", postIdx, "reactions"];

  const createCommentMutation = useMutation(
    (newComment: CreateCommentType) => {
      return axios.post(
        `/api/posts/${newComment.postIdx}/comments`,
        newComment
      );
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: queryKey,
        });
        toast.info("댓글이 정상적으로 작성되었습니다.");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "댓글 작성에 실패하였습니다."));
      },
    }
  );

  const updateCommentMutation = useMutation(
    (editComment: Partial<PostCommentType>) => {
      return axios.put(
        `/api/posts/${editComment.postIdx}/comments/${editComment.idx}`,
        editComment
      );
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: queryKey,
        });
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "댓글 수정을 실패하였습니다."));
      },
    }
  );

  const deleteCommentMutation = useMutation(
    ({
      commentIdx,
      postIdx,
    }: {
      commentIdx: number;
      postIdx: number | null;
    }) => {
      return axios.delete(`/api/posts/${postIdx}/comments/${commentIdx}`);
    },
    {
      onSuccess: (data, variables) => {
        queryClient.invalidateQueries({
          queryKey: queryKey,
        });
      },
      onError: (error) => {
        console.error(error);
        toast.error(getErrorMessage(error, "댓글 삭제를 실패하였습니다."));
      },
    }
  );

  return {
    createCommentMutation,
    updateCommentMutation,
    deleteCommentMutation,
  };
}
