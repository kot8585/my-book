import { addUserBookType } from "@/model/userBook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export default function useCreateUserBookMutation() {
  const queryClient = useQueryClient();

  const createUserBook = useMutation(
    (addUserBook: addUserBookType) => {
      return axios.post("/api/userbooks", addUserBook);
    },
    {
      onSuccess({ data }: AxiosResponse<addUserBookType>) {
        queryClient.invalidateQueries({
          queryKey: [
            "userBook",
            "list",
            { userIdx: data.userIdx, status: data.status },
          ],
        });
      },
    }
  );

  return { createUserBook };
}
