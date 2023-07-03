import React from "react";
import Avatar from "../common/Avatar";
import { User } from "next-auth";
import { UserFollowInfoType } from "@/model/user";

type Props = {
  user: UserFollowInfoType;
};

export default function UserFollowInfo({ user }: Props) {
  return (
    <>
      <Avatar image={user?.image} userIdx={user?.idx} size="large" />
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
    </>
  );
}
