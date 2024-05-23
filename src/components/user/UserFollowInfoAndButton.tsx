"use client";

import useFollow from "@/hooks/follow";
import { User } from "next-auth";
import { useEffect, useState } from "react";
import FollowButton from "./FollowButton";
import UserFollowInfo from "./UserFollowInfo";

type Props = {
  userIdx: number;
  loggedUser: User | undefined;
};

export default function UserFollowInfoAndButton({
  userIdx,
  loggedUser,
}: Props) {
  const {
    getFollowQuery: { data: user },
  } = useFollow(userIdx);

  const [following, setFollowing] = useState<boolean>();

  useEffect(() => {
    const following = user?.follower.find(
      (userIdx) => userIdx === loggedUser?.idx
    );
    setFollowing(!!following);
  }, [user, loggedUser]);

  return (
    <section className="flex gap-2 items-center">
      {user && (
        <>
          <UserFollowInfo user={user} />
          {userIdx === loggedUser?.idx && (
            <FollowButton
              following={following}
              followerIdx={loggedUser?.idx}
              followeeIdx={userIdx}
            />
          )}
        </>
      )}
    </section>
  );
}
