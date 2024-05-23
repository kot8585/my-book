"user client";

import useFollow from "@/hooks/follow";
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
  const { updateFollowMutation } = useFollow(followeeIdx);

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
