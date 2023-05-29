import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

export default function useUser() {
  const queryClient = useQueryClient();

  const setLikes = useMutation(
    (updateLikes: { postIdx: number; liked: boolean }) => {
      return axios.put("/api/likes", updateLikes);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users", "reactions"],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  const setBookmarks = useMutation(
    (updateBookmarks: { postIdx: number; bookmarked: boolean }) => {
      console.log("updateBookmarks", updateBookmarks);
      return axios.put("/api/bookmarks", updateBookmarks);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users", "reactions"],
        });
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );

  return { setLikes, setBookmarks };
}
