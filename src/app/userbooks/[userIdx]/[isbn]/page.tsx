"use client";

import ModalPortal from "@/components/common/ModalPortal";
import ThreeDotsButton from "@/components/common/ThreeDotsButton";
import ReactButtonList from "@/components/feed/ReactButtonList";
import BookCard from "@/components/home/BookCard";
import PostCard from "@/components/post/PostCard";
import PostModal from "@/components/post/PostModal";
import useNote from "@/hooks/note";
import { UserBookDetail } from "@/model/userBook";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { addUser } from "@/service/user";

export default function UserBookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { deletePost } = useNote();
  const user = session?.user;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const fetchUserBookInfo: () => Promise<UserBookDetail> = async () => {
    return axios
      .get(`/api/userbooks/${params.userIdx}/${params.isbn}`)
      .then((res) => res.data);
  };

  const toDeletePostIdx = useRef<number | null>(null);
  //🚨 status랑 같이 오네... 흠....
  const { data: userBook } = useQuery(
    ["UserBooks", "Detail", { isbn: params.isbn, userIdx: params.userIdx }],
    fetchUserBookInfo,
    { staleTime: 24 * 60 * 60 * 1000 }
  );

  const handleEdit = (postIdx: number) => {
    // 포스트 수정 페이지로 이동하기
    router.push(
      `/posts/write/${postIdx}?isbn=${userBook?.isbn}&readingType=${userBook?.type}`
    );
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
                <ReactButtonList />
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
