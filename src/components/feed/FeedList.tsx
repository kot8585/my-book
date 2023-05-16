import { FeedTotalPost } from "@/model/post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import FeedCard from "./FeedCard";
import { FeedType } from "@/app/feed/page";

type Props = {
  feedType: FeedType;
};

export default function FeedList({ feedType }: Props) {
  // 얘를 아마 다른데다가 놔야할텐데.....
  async function getPost(): Promise<FeedTotalPost[]> {
    return await axios
      .get("http://localhost:3000/api/posts")
      .then((response) => response.data);
  }
  const { data: feedList } = useQuery(["posts"], getPost);

  return (
    <ul>
      {feedList &&
        feedList.map((feed) => <FeedCard key={feed.idx} feed={feed} />)}
    </ul>
  );
}
