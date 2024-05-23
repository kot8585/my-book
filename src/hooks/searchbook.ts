import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useSearchBook(keyword: string | null) {
  const useSearchBookQuery = useQuery(
    ["search", "book", keyword],
    () =>
      axios
        .get(`/api/search?keyword=${encodeURIComponent(keyword!)}`)
        .then((response) => {
          return response.data;
        }),
    { enabled: !!keyword }
  );

  return { useSearchBookQuery };
}
