"use client";

import usePostDetailQuery from "@/hooks/usePostDetailQuery";
import { useParams } from "next/navigation";
import CommentList from "../comment/CommentList";
import ShowMessage from "../common/ShowMessage";
import FeedBookInfo from "../feed/FeedBookInfo";
import PostCard from "./PostCard";
import ReactionButtonList from "./Reactions";
import PostThreeDotButton from "./PostThreeDotButton";

export default function PostDetail() {
  const params = useParams();

  const { detailPost, error } = usePostDetailQuery({
    postIdx: parseInt(params.postIdx),
  });

  return (
    <section className="flex flex-col py-3">
      {detailPost && (
        <>
          <article className="flex flex-col border-b border-gray-300">
            <div className="flex justify-between items-center">
              <FeedBookInfo
                book={detailPost.userBook}
                createdAt={detailPost.createdAt}
              />
              <PostThreeDotButton
                postIdx={detailPost.idx}
                author={detailPost.userIdx}
              />
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
        </>
      )}
    </section>
  );
}
