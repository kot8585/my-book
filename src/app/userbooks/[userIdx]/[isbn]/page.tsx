"use client";

import ModalPortal from "@/components/common/ModalPortal";
import ThreeDotsButton from "@/components/common/ThreeDotsButton";
import BookCard from "@/components/home/BookCard";
import PostCard from "@/components/post/PostCard";
import PostModal from "@/components/post/PostModal";
import ReactionButtonList from "@/components/post/Reactions";
import { useDeletePostMutation } from "@/hooks/useDeletePostMutation";
import useUserBookDetailQuery from "@/hooks/useUserBookDetailQuery";
import { formatDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function UserBookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { deletePost } = useDeletePostMutation();
  const { userBook, isLoading, error } = useUserBookDetailQuery({
    isbn: params.isbn,
    userIdx: parseInt(params.userIdx),
  });
  const user = session?.user;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const toDeletePostIdx = useRef<number | null>(null);
  //🚨 status랑 같이 오네... 흠....

  const handleEdit = (postIdx: number) => {
    router.push(`/posts/write/${postIdx}`);
  };

  const handleDelete = (idx: number) => {
    setOpenModal(true);
    toDeletePostIdx.current = idx;
  };

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
                <PostCard
                  idx={post.idx}
                  title={post.title}
                  content={post.content}
                />
                {post.userIdx === user?.idx && (
                  <ThreeDotsButton
                    onEdit={() => {
                      handleEdit(post.idx);
                    }}
                    onDelete={() => handleDelete(post.idx)}
                  />
                )}
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  {formatDate(post.createdAt)}
                </span>
                <ReactionButtonList postIdx={post.idx} />
              </div>
            </li>
          ))}
        {openModal && (
          <ModalPortal>
            <PostModal
              onCancel={() => {
                setOpenModal(false);
                toDeletePostIdx.current = null;
              }}
              onOK={() => {
                if (!toDeletePostIdx.current) return;
                deletePost.mutate(toDeletePostIdx.current);
                toDeletePostIdx.current = null;
                setOpenModal(false);
              }}
            >
              <h5 className="font-bold text-lg p-3">메모 삭제</h5>
              <p>메모를 정말 삭제하시겠어요?</p>
            </PostModal>
          </ModalPortal>
        )}
      </ul>
    </section>
  );
}
