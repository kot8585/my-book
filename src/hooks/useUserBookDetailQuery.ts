import { UserBookDetail } from "@/model/userBook";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  isbn: string;
  userIdx: number;
};

export default function useUserBookDetailQuery({ isbn, userIdx }: Props) {
  const fetchUserBookInfo: () => Promise<UserBookDetail> = async () => {
    return axios
      .get(`/api/userbooks/${userIdx}/${isbn}`)
      .then((res) => res.data);
  };

  const {
    data: detailUserBook,
    isLoading,
    error,
  } = useQuery(
    ["posts", "userbooks", "detail", { isbn: isbn, userIdx: userIdx }],
    fetchUserBookInfo,
    { staleTime: 24 * 60 * 60 * 1000 }
  );

  return { userBook: detailUserBook, isLoading, error };
}
