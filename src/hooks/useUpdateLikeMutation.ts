import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useUpdateLikeMutation = (queryKey: string[]) => {
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
      await queryClient.cancelQueries(queryKey);
      const previousPosts = queryClient.getQueryData(queryKey);

      let setQuery;
      setQuery = (oldPosts: any) => {
        let post;
        if (queryKey.includes("list")) {
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

  return { setLikes };
};
