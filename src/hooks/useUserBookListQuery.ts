import { UserBook } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserBookListQuery = (
  userIdx: number,
  status: "READING" | "TOREAD" | "COMPLETED"
) => {
  const { data: userbooks, error } = useQuery(
    ["userbooks", "list", userIdx, { filter: status }],
    (): Promise<UserBook[]> =>
      axios.get(`/api/userbooks?status=${status}`).then((res) => res.data),
    {
      suspense: true,
    }
  );

  return { userbooks, error };
};
