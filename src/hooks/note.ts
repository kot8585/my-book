import { UserBook } from "@/model/userBook";
import { CreateNoteType } from "./../model/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AxiosResponse } from "axios";

export default function useNote() {
  const queryClient = useQueryClient();

  const addNote = useMutation(
    (newNote: CreateNoteType) => {
      return axios.post("/api/posts", newNote);
    },
    {
      onSuccess: ({ data }: AxiosResponse<UserBook>) => {
        queryClient.invalidateQueries({
          queryKey: ["note", data.isbn, data.userIdx],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return { addNote };
}
