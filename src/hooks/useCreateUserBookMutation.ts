import { addUserBookType } from "@/model/userBook";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";

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
        toast.info("책을 성공적으로 추가하였습니다.");
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, "책 추가에 실패하였습니다."));
      },
    }
  );

  return { createUserBook };
}
