import { getErrorMessage } from "@/utils/getErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const useUpdateLikeMutation = () => {
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
      queryClient.setQueryData(["posts", "likePosts"], context.previousPosts);
      toast.error(getErrorMessage(error, "좋아요 처리를 실패하였습니다."));
    },
  });

  return { setLikes };
};
