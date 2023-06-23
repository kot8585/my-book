"use client";

import { UserFollowInfoType } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Avatar from "../common/Avatar";
import FollowButton from "./FollowButton";
import { User } from "next-auth";

type Props = {
  userIdx: number;
  loggedUser: User | undefined;
};

export default function UserFollowInfo({ userIdx, loggedUser }: Props) {
  const {
    data: user,
    isError,
    isLoading,
  } = useQuery<UserFollowInfoType>(["users", "detail", userIdx, "follow"], () =>
    axios
      .get(`${process.env.NEXT_PUBLIC_URL}/api/users/${userIdx}`)
      .then((res) => res.data)
  );

  const [following, setFollowing] = useState<boolean>();

  useEffect(() => {
    const following = user?.follower.find((userIdx) => {
      console.log("userIdx", userIdx, "logg", loggedUser?.idx);
      return userIdx === loggedUser?.idx;
    });
    setFollowing(!!following);
  }, [user, loggedUser]);

  return (
    <section className="flex gap-2 items-center">
      {user && (
        <>
          <Avatar image={user?.image} size="large" />
          <div className="flex-1 ">
            <div>{user.name}</div>
            <div className="text-gray-500 text-sm flex gap-1">
              <span>{user.followeeCnt}</span>
              <span>팔로잉</span>
              <span>﹒</span>
              <span>{user.followerCnt}</span>
              <span>팔로워</span>
            </div>
          </div>
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
