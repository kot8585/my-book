"use client";

import BookCard from "@/components/home/BookCard";
import PostCard from "@/components/post/PostCard";
import PostThreeDotButton from "@/components/post/PostThreeDotButton";
import ReactionButtonList from "@/components/post/Reactions";
import useUserBookDetailQuery from "@/hooks/useUserBookDetailQuery";
import { formatDate } from "@/utils/formatDate";
import { useParams } from "next/navigation";

export default function UserBookDetailPage() {
  const params = useParams();

  const { userBook, isLoading, error } = useUserBookDetailQuery({
    isbn: params.isbn,
    userIdx: parseInt(params.userIdx),
  });

  return (
    <section className="lg:w-4/5 w-full h-full flex flex-col mx-auto p-3">
      <div className="mb-5">
        {userBook && <BookCard book={userBook} size="large" />}
      </div>
      <h2 className="font-bold pt-2">작성한 노트</h2>
      <ul>
        {userBook &&
          userBook.posts &&
          userBook.posts.map((post) => (
            <li
              key={post.idx}
              className="border rounded-lg border-gray-300 p-2 my-3"
            >
              <div className="flex justify-between">
                <PostCard {...post} />
                <PostThreeDotButton postIdx={post.idx} author={post.userIdx} />
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  {formatDate(post.createdAt)}
                </span>
                <ReactionButtonList {...post} />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
