"user client";

import { UserFollowInfoType } from "@/model/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

type Props = {
  following?: boolean;
  followerIdx?: number;
  followeeIdx: number;
};

export default function FollowButton({
  following,
  followerIdx,
  followeeIdx,
}: Props) {
  const queryClient = useQueryClient();
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
        queryKey: ["users", "detail", followeeIdx, "follow"],
      });

      const previousData: UserFollowInfoType | undefined =
        await queryClient.getQueryData([
          "users",
          "detail",
          followeeIdx,
          "follow",
        ]);

      if (!previousData) {
        return;
      }

      console.log("previous data:", previousData);

      const newData = {
        ...previousData,
        follower: following
          ? previousData.follower.filter(
              (previousFollowerIdx) => previousFollowerIdx !== followerIdx
            )
          : [...previousData.follower, followerIdx!],
        followerCnt: following
          ? previousData.followerCnt - 1
          : previousData.followerCnt + 1,
      };
      console.log("new data: ", newData);

      queryClient.setQueryData(
        ["users", "detail", followeeIdx, "follow"],
        newData
      );

      return { previousData };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        ["users", "detail", followeeIdx, "follow"],
        context?.previousData
      );
      toast.error("요청사항을 처리하는데 실패하였습니다");
    },
  });

  const toggleFollow = async () => {
    if (!followerIdx) {
      toast.error("로그인이 필요합니다");
      return;
    }

    if (following === undefined) {
      return;
    }

    updateFollowMutation.mutate({ followerIdx, followeeIdx, following });
  };
  return (
    <>
      {following ? (
        <button className="rounded-lg border h-8 px-2 " onClick={toggleFollow}>
          팔로잉
        </button>
      ) : (
        <button
          className={`bg-brand-color rounded-lg text-white h-8 px-2 disabled:opacity-50`}
          onClick={toggleFollow}
          disabled={following === undefined}
        >
          팔로우
        </button>
      )}
    </>
  );
}
