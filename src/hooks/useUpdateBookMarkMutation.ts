import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useUpdateBookMarkMutation() {
  const queryClient = useQueryClient();

  const setBookmarks = useMutation({
    mutationFn: (updateBookmarks: {
      postIdx: number;
      bookmarked: boolean;
      userIdx: number;
    }) => {
      return axios.put("/api/bookmarks", updateBookmarks);
    },

    onMutate: async (updateBookmarks: {
      postIdx: number;
      bookmarked: boolean;
      userIdx: number;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["posts", "bookmarkPosts"] });
      const previousPosts = queryClient.getQueryData([
        "posts",
        "bookmarkPosts",
      ]);
      let setQuery;
      if (updateBookmarks.bookmarked) {
        setQuery = (oldBookmarkPosts: any) =>
          oldBookmarkPosts.filter(
            (bookmarkPostIdx: number) =>
              bookmarkPostIdx !== updateBookmarks.postIdx
          );
      } else {
        setQuery = (oldBookmarkPosts: any) => [
          ...oldBookmarkPosts,
          updateBookmarks.postIdx,
        ];
      }

      queryClient.setQueryData(["posts", "bookmarkPosts"], setQuery);
      return { previousPosts };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "bookmarkPosts"],
      });
    },

    onError: (error, updateLikes, context: any) => {
      queryClient.setQueryData(
        ["posts", "bookmarkPosts"],
        context.previousPosts
      );
      console.error(error);
    },
  });

  return { setBookmarks };
}
