import { UserFollowInfoType } from "@/model/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export default function useFollow(userIdx: number) {
  const queryClient = useQueryClient();
  const queryKey = ["users", "detail", userIdx, "follow"];

  const getFollowQuery = useQuery<UserFollowInfoType>(queryKey, () =>
    axios.get(`/api/users/${userIdx}`).then((res) => res.data)
  );

  const updateFollowMutation = useMutation({
    mutationFn: (updateFollow: {
      followerIdx: number;
      followeeIdx: number;
      following: boolean;
    }) => {
      return axios.put("/api/follow", updateFollow);
    },
    onMutate: async (updateFollow: {
      followerIdx: number;
      followeeIdx: number;
      following: boolean;
    }) => {
      await queryClient.cancelQueries({
        queryKey: queryKey,
      });

      const previousData: UserFollowInfoType | undefined =
        await queryClient.getQueryData(queryKey);

      if (!previousData) {
        return;
      }

      console.log("previous data:", previousData);

      const newData = {
        ...previousData,
        follower: updateFollow.following
          ? previousData.follower.filter(
              (previousFollowerIdx) =>
                previousFollowerIdx !== updateFollow.followerIdx
            )
          : [...previousData.follower, updateFollow.followerIdx!],
        followerCnt: updateFollow.following
          ? previousData.followerCnt - 1
          : previousData.followerCnt + 1,
      };
      console.log("new data: ", newData);

      queryClient.setQueryData(queryKey, newData);

      return { previousData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(queryKey, context?.previousData);
      toast.error("요청사항을 처리하는데 실패하였습니다");
    },
  });

  return { getFollowQuery, updateFollowMutation };
}
