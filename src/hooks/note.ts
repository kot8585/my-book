import { UserBook } from "@/model/userBook";
import { CreateNoteType } from "./../model/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { AxiosResponse } from "axios";
import { Post } from "@prisma/client";

export default function useNote() {
  const queryClient = useQueryClient();

  const addNote = useMutation(
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

  const editPost = useMutation(
    (editPost: Partial<Post>) => {
      return axios.put(`/api/posts/${editPost.idx}`, editPost);
    },
    {
      onSuccess: ({ data }: AxiosResponse<Post>) => {
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const deletePost = useMutation(
    (postIdx: number) => {
      return axios.delete(`/api/posts/${postIdx}`);
    },
    {
      onSuccess: ({ data }: AxiosResponse<Post>) => {
        queryClient.invalidateQueries({
          queryKey: ["posts"],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return { addNote, editPost, deletePost };
}
