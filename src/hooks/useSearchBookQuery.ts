import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useSearchBookQuery = (keyword: string | null) => {
  const {
    data: searchBookList,
    isLoading,
    error,
  } = useQuery(
    ["search", "book", keyword],
    () =>
      axios
        .get(`/api/search?keyword=${encodeURIComponent(keyword!)}`)
        .then((response) => {
          return response.data;
        }),
    { enabled: !!keyword }
  );

  return { searchBookList, isLoading, error };
};
