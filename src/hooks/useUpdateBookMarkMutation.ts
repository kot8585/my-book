import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useUpdateBookMarkMutation(queryKey: string[]) {
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
      await queryClient.cancelQueries(queryKey);
      const previousPosts = queryClient.getQueryData(queryKey);

      let setQuery;
      setQuery = (oldPosts: any) => {
        let post;
        if (queryKey.includes("list")) {
          post = oldPosts.find(
            (oldPost: any) => oldPost.idx === updateBookmarks.postIdx
          );
        } else {
          post = oldPosts;
        }
        if (updateBookmarks.bookmarked) {
          post.bookmarkUsers.pop({ userIdx: updateBookmarks.userIdx });
          --post._count.bookmarkUsers;
        } else {
          post.bookmarkUsers.push({
            userIdx: updateBookmarks.userIdx,
          });
          ++post._count.bookmarkUsers;
        }
        return oldPosts;
      };

      queryClient.setQueryData(queryKey, setQuery);
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
      toast.error(getErrorMessage(error, "북마크 등록을 실패하였습니다."));
    },
  });

  return { setBookmarks };
}
