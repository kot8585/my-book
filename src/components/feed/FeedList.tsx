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
  async function getPost(): Promise<FeedTotalPost[]> {
    return await axios
      .get(`http://localhost:3000/api/posts?feedType=${feedType}`)
      .then((response) => response.data);
  }

  // TODO: type에 따른 캐싱
  const { data: feedList } = useQuery(["feeds", feedType], getPost);
  console.log("feedList : ", feedList);
  return (
    <ul>
      {feedList &&
        feedList.map((feed) => <FeedCard key={feed.idx} feed={feed} />)}
    </ul>
  );
}
