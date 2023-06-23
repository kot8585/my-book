import { UserBook } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUserBookListQuery = (
  userIdx: number,
  status: "READING" | "TOREAD" | "COMPLETED",
  pathname: string = ""
) => {
  const { data: userbooks, error } = useQuery(
    ["userbooks", "list", userIdx, { filter: status }],
    (): Promise<UserBook[]> =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_URL}/api${pathname}/userbooks?status=${status}`
        )
        .then((res) => res.data),
    {
      suspense: true,
    }
  );

  return { userbooks, error };
};
