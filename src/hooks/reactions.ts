import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useReactions(queryKey: string[]) {
  const queryClient = useQueryClient();

  const updateBookMarksMutation = useMutation({
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
        if (queryKey.includes("userbooks")) {
          post = oldPosts.posts.find(
            (oldPost: any) => oldPost.idx === updateBookmarks.postIdx
          );
        } else if (queryKey.includes("list")) {
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
        queryKey: queryKey,
      });
    },

    onError: (error, updateLikes, context: any) => {
      queryClient.setQueryData(queryKey, context.previousPosts);
      toast.error(getErrorMessage(error, "북마크 등록을 실패하였습니다."));
    },
  });

  const updateLikesMutation = useMutation({
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
      await queryClient.cancelQueries(queryKey);
      const previousPosts = queryClient.getQueryData(queryKey);

      let setQuery;
      setQuery = (oldPosts: any) => {
        let post;
        if (queryKey.includes("userbooks")) {
          post = oldPosts.posts.find(
            (oldPost: any) => oldPost.idx === updateLikes.postIdx
          );
        } else if (queryKey.includes("list")) {
          post = oldPosts.find(
            (oldPost: any) => oldPost.idx === updateLikes.postIdx
          );
        } else {
          post = oldPosts;
        }

        if (updateLikes.liked) {
          post.likeUsers.pop({ userIdx: updateLikes.userIdx });
          --post._count.likeUsers;
        } else {
          post.likeUsers.push({
            userIdx: updateLikes.userIdx,
          });
          ++post._count.likeUsers;
        }
        return oldPosts;
      };

      queryClient.setQueryData(queryKey, setQuery);
      return { previousPosts };
    },

    onSuccess: () => {},

    onError: (error, updateLikes, context: any) => {
      queryClient.setQueryData(queryKey, context.previousPosts);
      toast.error(getErrorMessage(error, "좋아요 처리를 실패하였습니다."));
    },
  });

  return { updateBookMarksMutation, updateLikesMutation };
}
