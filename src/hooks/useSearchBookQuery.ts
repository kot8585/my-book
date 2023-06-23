import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSearchBookQuery = (keyword: string | null) => {
  const { data: searchBookList, error } = useQuery(
    ["search", "book", keyword],
    () =>
      axios
        .get(
          `${
            process.env.NEXT_PUBLIC_URL
          }/api/search?keyword=${encodeURIComponent(keyword!)}`
        )
        .then((response) => {
          return response.data;
        }),
    { enabled: !!keyword }
  );

  return { searchBookList, error };
};
