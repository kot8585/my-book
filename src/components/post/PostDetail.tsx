"use client";

import usePostDetailQuery from "@/hooks/usePostDetailQuery";
import { notFound, useParams } from "next/navigation";
import FeedBookInfo from "../feed/FeedBookInfo";
import PostCard from "./PostCard";
import ReactionButtonList from "./Reactions";
import PostThreeDotButton from "./PostThreeDotButton";
import PostCommentList from "./PostCommentList";
import PostCommentCreateForm from "./PostCommentCreateForm";

export default function PostDetail() {
  const params = useParams();

  const { detailPost, error, isLoading } = usePostDetailQuery({
    postIdx: parseInt(params.postIdx),
  });

  if (!detailPost && !error && !isLoading) {
    return notFound();
  }

  return (
    <section className="flex flex-col p-3">
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
            <PostCard {...detailPost} />
            <div className="py-2 self-end ">
              <ReactionButtonList {...detailPost} />
            </div>
          </article>
          <section className="border-t border-gray-200 py-2">
            <PostCommentCreateForm postIdx={detailPost.idx} />
            <PostCommentList comments={detailPost.comments} />
          </section>
        </>
      )}
    </section>
  );
}
