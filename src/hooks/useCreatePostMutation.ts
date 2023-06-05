import { CreateNoteType } from "@/model/post";
import { UserBook } from "@/model/userBook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

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
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return { createPost };
};
