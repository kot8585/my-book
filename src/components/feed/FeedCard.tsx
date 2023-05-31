import { FeedResponseType } from "@/model/post";
import React from "react";

import UserInfo from "../common/UserInfo";
import PostCard from "../post/PostCard";
import ReactionButtonList from "../post/Reactions";
import FeedBookInfo from "./FeedBookInfo";

type Props = {
  feed: FeedResponseType;
};

export default function FeedCard({ feed }: Props) {
  return (
    <li className="flex flex-col border border-gray-200 rounded-xl p-2 shadow-lg gap-2 my-5">
      <FeedBookInfo book={feed.userBook} createdAt={feed.createdAt} />
      <PostCard title={feed.title} content={feed.content} idx={feed.idx} />
      <hr />
      <div className="flex justify-between items-center">
        <UserInfo image={feed.user.image} name={feed.user.name} />
        <ReactionButtonList postIdx={feed.idx} />
      </div>
    </li>
  );
}
