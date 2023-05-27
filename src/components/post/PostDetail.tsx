"use client";

import { PostDetailType } from "@/model/post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import CommentList from "../comment/CommentList";
import LoadingSpinner from "../common/LoadingSpinner";
import ShowMessage from "../common/ShowMessage";
import FeedBookInfo from "../feed/FeedBookInfo";
import ReactButtonList from "../feed/ReactButtonList";
import PostCard from "./PostCard";
import { useState } from "react";

export default function PostDetail() {
  const params = useParams();
  const postIdx = params.postIdx;
  const [clickHeart, setClickHeart] = useState(false);
  const [clickBookMark, setClickBookMark] = useState(false);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery(
    ["posts", "detail", { postIdx }],
    (): Promise<PostDetailType> =>
      axios.get(`/api/posts/${postIdx}`).then((res) => res.data)
  );

  if (post) {
    return (
      <section className="flex flex-col py-3">
        <article className="flex flex-col border-b border-gray-300">
          <FeedBookInfo book={post.userBook} createdAt={post.createdAt} />
          <div className="pb-3 pt-1">
            <span className="text-gray-400 text-sm">by </span>
            <span className="text-sm text-gray-500">{post.user.name}</span>
          </div>
          <PostCard title={post.title} content={post.content} idx={post.idx} />
          <div className="py-2 self-end ">
            <ReactButtonList />
          </div>
        </article>
        <section className="border-t border-gray-200 py-2">
          <input
            type="text"
            className="w-full bg-gray-200 p-1 rounded-lg mb-2 outline-none"
            placeholder="댓글을 작성해 주세요"
          />
          <CommentList comments={post.comments} />
        </section>
      </section>
    );
  }

  if (error) {
    return <ShowMessage message="에러가 발생하였습니다." />;
  }
  return <>{isLoading && <LoadingSpinner />}</>;
}
