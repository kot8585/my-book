"use client";

import usePostDetailQuery from "@/hooks/usePostDetailQuery";
import { useParams } from "next/navigation";
import CommentList from "../comment/CommentList";
import ShowMessage from "../common/ShowMessage";
import FeedBookInfo from "../feed/FeedBookInfo";
import PostCard from "./PostCard";
import ReactionButtonList from "./Reactions";

export default function PostDetail() {
  const params = useParams();

  const { detailPost, error } = usePostDetailQuery({
    postIdx: parseInt(params.postIdx),
  });

  if (detailPost) {
    return (
      <section className="flex flex-col py-3">
        <article className="flex flex-col border-b border-gray-300">
          <FeedBookInfo
            book={detailPost.userBook}
            createdAt={detailPost.createdAt}
          />
          <div className="pb-3 pt-1">
            <span className="text-gray-400 text-sm">by </span>
            <span className="text-sm text-gray-500">
              {detailPost.user.name}
            </span>
          </div>
          <PostCard
            title={detailPost.title}
            content={detailPost.content}
            idx={detailPost.idx}
          />
          <div className="py-2 self-end ">
            <ReactionButtonList postIdx={detailPost.idx} />
          </div>
        </article>
        <section className="border-t border-gray-200 py-2">
          <input
            type="text"
            className="w-full bg-gray-200 p-1 rounded-lg mb-2 outline-none"
            placeholder="댓글을 작성해 주세요"
          />
          <CommentList comments={detailPost.comments} />
        </section>
      </section>
    );
  }

  if (error) return <ShowMessage message="에러가 발생하였습니다." />;

  return <></>;
}
