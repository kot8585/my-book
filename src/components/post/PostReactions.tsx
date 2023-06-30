"use client";

import { PostReactionsType } from "@/model/post";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import QueryErrorBoundary from "../common/QueryErrorBoundary";
import PostCommentCreateForm from "./PostCommentCreateForm";
import PostCommentList from "./PostCommentList";
import ReactionButtonList from "./Reactions";

type Props = {
  postIdx: number;
};

export default function PostReactions({ postIdx }: Props) {
  const queryKey = ["posts", "detail", postIdx.toString(), "reactions"];
  const { data: postReactions } = useQuery<PostReactionsType>(queryKey, () =>
    axios.get(`/api/posts/${postIdx}/reactions`).then((res) => res.data)
  );

  return (
    <>
      {postReactions && (
        <>
          <div className="py-2 self-end ">
            <QueryErrorBoundary>
              <ReactionButtonList
                queryKey={queryKey}
                _count={postReactions._count}
                idx={postIdx}
                likeUsers={postReactions.likeUsers}
                bookmarkUsers={postReactions.bookmarkUsers}
              />
            </QueryErrorBoundary>
          </div>
          <section className="border-t-2 border-gray-300 my-2 flex-">
            <QueryErrorBoundary>
              <PostCommentCreateForm postIdx={postReactions.idx} />
            </QueryErrorBoundary>
            <QueryErrorBoundary>
              <PostCommentList
                key={postReactions._count.comments}
                comments={postReactions.comments}
                postAuthorIdx={postReactions.userIdx}
              />
            </QueryErrorBoundary>
          </section>
        </>
      )}
    </>
  );
}
