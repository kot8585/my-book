import { addUserBookType } from "@/model/userBook";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export default function useUserBook() {
  const queryClient = useQueryClient();

  const addUserBookMutate = useMutation(
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

  return { addUserBookMutate };
}
