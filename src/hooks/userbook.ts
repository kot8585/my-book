import { UserBookDetail } from "@/model/userBook";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  isbn: string;
  userIdx: number;
};

export default function useUserBook({ isbn, userIdx }: Props) {
  const getUserBookDetailQuery = useQuery(
    ["posts", "userbooks", "detail", { isbn: isbn, userIdx: userIdx }],
    () =>
      axios
        .get(`/api/userbooks/${userIdx}/${isbn}`)
        .then((response) => response.data),
    { staleTime: 24 * 60 * 60 * 1000 }
  );

  return { getUserBookDetailQuery };
}
