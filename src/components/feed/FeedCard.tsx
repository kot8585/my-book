import { FeedResponseType } from "@/model/post";

import PostThreeDotButton from "../post/PostThreeDotButton";
import ReactionButtonList from "../post/Reactions";
import FeedBookInfo from "./FeedBookInfo";
import PostListCard from "../post/PostListCard";
import Avatar from "../common/Avatar";
import { FeedType } from "./FeedTemplate";

type Props = {
  feed: FeedResponseType;
  feedType: FeedType;
};

export default function FeedCard({ feed, feedType }: Props) {
  return (
    <li className="flex flex-col border border-gray-200 rounded-xl p-2 shadow-lg gap-2 my-5">
      <div className="flex justify-between">
        <FeedBookInfo book={feed.userBook} createdAt={feed.createdAt} />
        <PostThreeDotButton postIdx={feed.idx} author={feed.userIdx} />
      </div>
      <PostListCard {...feed} />
      <hr />
      <div className="flex justify-between items-center">
        <div className="flex justify-start gap-2 items-center">
          <Avatar image={feed.user.image} />
          <span className="text-xs text-gray-400">{feed.user.name}</span>
        </div>
        <ReactionButtonList {...feed} queryKey={["posts", "list", feedType]} />
      </div>
    </li>
  );
}
