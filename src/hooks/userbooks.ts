import { UserBook, addUserBookType } from "@/model/userBook";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

export default function useUserBooks(
  userIdx?: number,
  status?: "READING" | "TOREAD" | "COMPLETED",
  pathname: string = ""
) {
  const queryClient = useQueryClient();

  const getUserBookListQuery = useQuery(
    ["userbooks", "list", userIdx, { filter: status }],
    (): Promise<UserBook[]> =>
      axios
        .get(`/api${pathname}/userbooks?status=${status}`)
        .then((res) => res.data),
    {
      suspense: true,
      staleTime: 1000 * 60 * 60,
    }
  );

  const createUserBookMutation = useMutation(
    (addUserBook: addUserBookType) => {
      return axios.post("/api/userbooks", addUserBook);
    },
    {
      onSuccess({ data }: AxiosResponse<addUserBookType>) {
        queryClient.invalidateQueries({
          queryKey: [
            "userbooks",
            "list",
            data.userIdx,
            { filter: data.status },
          ],
        });
        toast.info("책을 성공적으로 추가하였습니다.");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "책 추가에 실패하였습니다."));
      },
    }
  );

  return { getUserBookListQuery, createUserBookMutation };
}
