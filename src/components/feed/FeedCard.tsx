import { FeedResponseType } from "@/model/post";

import PostThreeDotButton from "../post/PostThreeDotButton";
import ReactionButtonList from "../post/Reactions";
import UserInfo from "../user/UserInfo";
import FeedBookInfo from "./FeedBookInfo";
import PostCard from "../post/PostCard";

type Props = {
  feed: FeedResponseType;
};

export default function FeedCard({ feed }: Props) {
  return (
    <li className="flex flex-col border border-gray-200 rounded-xl p-2 shadow-lg gap-2 my-5">
      <div className="flex justify-between">
        <FeedBookInfo book={feed.userBook} createdAt={feed.createdAt} />
        <PostThreeDotButton postIdx={feed.idx} author={feed.userIdx} />
      </div>
      <PostCard {...feed} />
      <hr />
      <div className="flex justify-between items-center">
        <UserInfo image={feed.user.image} name={feed.user.name} />
        <ReactionButtonList {...feed} />
      </div>
    </li>
  );
}
