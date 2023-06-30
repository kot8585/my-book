import { getErrorMessage } from "@/utils/getErrorMessage";
import { Post } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useUpdatePostMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const editPost = useMutation(
    (editPost: Partial<Post>) => {
      return axios.put(`/api/posts/${editPost.idx}`, editPost);
    },
    {
      onSuccess: ({ data }: AxiosResponse<Post>) => {
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
        router.refresh();
        toast.info("글 수정을 완료하였습니다.");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "글 수정을 실패하였습니다."));
      },
    }
  );
  return { editPost };
};
