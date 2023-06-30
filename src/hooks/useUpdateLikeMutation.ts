import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useUpdateLikeMutation = (postIdx: number) => {
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
      await queryClient.cancelQueries({
        queryKey: ["posts", "detail", postIdx, "reactions"],
      });
      const previousPosts = queryClient.getQueryData([
        "posts",
        "detail",
        postIdx,
        "reactions",
      ]);

      let setQuery;
      if (updateLikes.liked) {
        //TODO: cache key가 list일 경우 idx로 해당 포스트 가져오기
        setQuery = (oldLikePosts: any) => {
          oldLikePosts.likeUsers.pop({ userIdx: updateLikes.userIdx });
          --oldLikePosts._count.likeUsers;
          return oldLikePosts;
        };
      } else {
        setQuery = (oldLikePosts: any) => {
          oldLikePosts.likeUsers.push({
            userIdx: updateLikes.userIdx,
          });
          ++oldLikePosts._count.likeUsers;
          return oldLikePosts;
        };
      }

      queryClient.setQueryData(
        ["posts", "detail", postIdx, "reactions"],
        setQuery
      );
      return { previousPosts };
    },

    onSuccess: () => {},

    onError: (error, updateLikes, context: any) => {
      queryClient.setQueryData(
        ["posts", "detail", postIdx, "reactions"],
        context.previousPosts
      );
      toast.error(getErrorMessage(error, "좋아요 처리를 실패하였습니다."));
    },
  });

  return { setLikes };
};
