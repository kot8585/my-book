import { CreateNoteType } from "@/model/post";
import { UserBook } from "@/model/userBook";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export const useCreatePostMutation = () => {
  const queryClient = useQueryClient();

  const createPost = useMutation(
    (newNote: CreateNoteType) => {
      return axios.post("/api/posts", newNote);
    },
    {
      onSuccess: ({ data }: AxiosResponse<UserBook>) => {
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
      onError(error, variables, context) {
        toast.error(getErrorMessage(error, "노트작성에 실패하였습니다."));
      },
    }
  );

  return { createPost };
};
