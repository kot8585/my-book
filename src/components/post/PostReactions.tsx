"use client";

import React, { Suspense } from "react";
import QueryErrorBoundary from "../common/QueryErrorBoundary";
import PostCommentCreateForm from "./PostCommentCreateForm";
import PostCommentList from "./PostCommentList";
import { PostDetailType, PostReactionsType } from "@/model/post";
import ReactionButtonList from "./Reactions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  postIdx: number;
};

export default function PostReactions({ postIdx }: Props) {
  const { data: postReactions } = useQuery<PostReactionsType>(
    ["posts", "detail", postIdx, "reactions"],
    () => axios.get(`/api/posts/${postIdx}/reactions`).then((res) => res.data)
  );

  return (
    <>
      {postReactions && (
        <>
          <div className="py-2 self-end ">
            <QueryErrorBoundary>
              <ReactionButtonList
                _count={postReactions._count}
                idx={postIdx}
                likeUsers={postReactions.likeUsers}
                bookmarkUsers={postReactions.bookmarkUsers}
              />
            </QueryErrorBoundary>
          </div>
          <section className="border-t-2 border-gray-300 my-2 flex-">
            <Suspense>
              <QueryErrorBoundary>
                <PostCommentCreateForm postIdx={postReactions.idx} />
              </QueryErrorBoundary>
              <QueryErrorBoundary>
                <PostCommentList
                  comments={postReactions.comments}
                  postAuthorIdx={postReactions.userIdx}
                />
              </QueryErrorBoundary>
            </Suspense>
          </section>
        </>
      )}
    </>
  );
}
