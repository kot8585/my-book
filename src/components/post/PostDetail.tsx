"use client";

import { PostDetailType } from "@/model/post";
import QueryErrorBoundary from "../common/QueryErrorBoundary";
import FeedBookInfo from "../feed/FeedBookInfo";
import PostContent from "./PostContent";
import PostThreeDotButton from "./PostThreeDotButton";

type Props = {
  detailPost: PostDetailType;
};

export default function PostDetail({ detailPost }: Props) {
  return (
    <section className="flex flex-col">
      {detailPost && (
        <>
          <QueryErrorBoundary>
            <article className="flex flex-col gap-2">
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
            </article>
          </QueryErrorBoundary>
        </>
      )}
    </section>
  );
}
