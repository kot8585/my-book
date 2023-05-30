import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useUser() {
  const queryClient = useQueryClient();

  const setLikes = useMutation({
    mutationFn: (updateLikes: {
      postIdx: number;
      liked: boolean;
      userIdx: number;
    }) => {
      return axios.put("/api/likes", updateLikes);
    },
    onMutate: async (updateLikes: {
      postIdx: number;
      liked: boolean;
      userIdx: number;
    }) => {
      await queryClient.cancelQueries({ queryKey: ["posts", "likePosts"] });
      const previousPosts = queryClient.getQueryData(["posts", "likePosts"]);
      let setQuery;
      if (updateLikes.liked) {
        setQuery = (oldLikePosts: any) =>
          oldLikePosts.filter(
            (likePostIdx: number) => likePostIdx !== updateLikes.postIdx
          );
      } else {
        setQuery = (oldLikePosts: any) => [
          ...oldLikePosts,
          updateLikes.postIdx,
        ];
      }

      queryClient.setQueryData(["posts", "likePosts"], setQuery);
      return { previousPosts };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts", "likePosts"],
      });
    },
    onError: (error, updateLikes, context: any) => {
      console.log("previous post: ", context.previousPosts);
      queryClient.setQueryData(["posts", "likePosts"], context.previousPosts);
      console.error(error);
    },
  });

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

  return { setLikes, setBookmarks };
}
