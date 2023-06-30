"use client";

import { UserFollowInfoType } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import FollowButton from "./FollowButton";
import { User } from "next-auth";
import { useFollowInfoQuery } from "@/hooks/useFollowInfoQuery";
import UserFollowInfo from "./UserFollowInfo";

type Props = {
  userIdx: number;
  loggedUser: User | undefined;
};

export default function UserFollowInfoAndButton({
  userIdx,
  loggedUser,
}: Props) {
  const { user } = useFollowInfoQuery(userIdx);

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
