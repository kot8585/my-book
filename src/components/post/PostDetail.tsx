"use client";

import { PostDetailType } from "@/model/post";
import QueryErrorBoundary from "../common/QueryErrorBoundary";
import FeedBookInfo from "../feed/FeedBookInfo";
import PostCommentCreateForm from "./PostCommentCreateForm";
import PostCommentList from "./PostCommentList";
import PostContent from "./PostContent";
import PostThreeDotButton from "./PostThreeDotButton";
import ReactionButtonList from "./Reactions";

type Props = {
  detailPost: PostDetailType;
};

export default function PostDetail({ detailPost }: Props) {
  return (
    <section className="flex flex-col p-3">
      {detailPost && (
        <>
          <QueryErrorBoundary>
            <article className="flex flex-col border-b border-gray-300 gap-2">
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
              <PostContent {...detailPost} />
              <div className="py-2 self-end ">
                <ReactionButtonList {...detailPost} />
              </div>
            </article>
          </QueryErrorBoundary>
          <section className="border-t border-gray-200 py-2 flex-">
            <QueryErrorBoundary>
              <PostCommentCreateForm postIdx={detailPost.idx} />
              <PostCommentList
                comments={detailPost.comments}
                postAuthorIdx={detailPost.userIdx}
              />
            </QueryErrorBoundary>
          </section>
        </>
      )}
    </section>
  );
}
