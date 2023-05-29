"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import ModalPortal from "@/components/common/ModalPortal";
import SimpleButton from "@/components/common/SimpleButton";
import PostModal from "@/components/post/PostModal";
import useNote from "@/hooks/note";
import { CreateNoteType } from "@/model/post";
import { useSession } from "next-auth/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";

export default function WritePostPage() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  const { addNote } = useNote();
  const searchParams = useSearchParams();
  //TODO: isbn과 readingType이 전해지지 않을 수가 있어,,? 이런것도 처리해줘야돼?
  const isbn = searchParams.get("isbn");
  const readingType = searchParams.get("readingType");

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [note, setNote] = useState<CreateNoteType>({
    userIdx: user.idx,
    type: "NOTE",
    openType: "NONE",
    page: 0,
    content: "",
    isbn: isbn!,
  });

  const onClose = () => setOpenModal(true);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNote((note) => ({ ...note, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (typeof note.page === "string") {
      note.page = parseInt(note.page);
    }

    //useQuery mutation 처리
    //mutation의 후처리를 할 수 있다
    addNote.mutate(note, {
      onSuccess: () => {
        setLoading(false);
        router.back();
      },
      onError(error, variables, context) {
        setLoading(false);
        //TODO: 에러 메세지 보여주기
      },
    });
  };

  return (
    <section className="relative w-full">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-yellow-100/20">
          <LoadingSpinner />
        </div>
      )}
      <form
        className="flex  flex-col relative justify-start max-w-3xl  py-1 mx-auto lg:w-4/5 w-full h-full"
        onSubmit={handleSubmit}
      >
        <header className="flex justify-between items-center fixed h-10 bg-white z-10 max-w-3xl lg:w-4/5 w-full">
          <SimpleButton type="button" onClick={onClose}>
            닫기
          </SimpleButton>
          메모 작성
          <SimpleButton
            type="submit"
            onSubmit={handleSubmit}
            color="text-brand-color"
          >
            완료
          </SimpleButton>
        </header>
        <main className="flex flex-col gap-3 mt-11 p-3 lg:p-0">
          <div className="relative w-14">
            <input
              type="number"
              min={0}
              className="p-2 w-full h-8 bg-gray-100 rounded-md focus:outline-none"
              name="page"
              value={note?.page}
              onChange={handleChange}
              inputMode="numeric"
            />
            <span className="absolute right-2 top-[0.45rem]  text-gray-500 appearance-none text-sm">
              {readingType === "PAPER" ? "p" : "%"}
            </span>
          </div>
          <textarea
            placeholder="내용을 입력해주세요"
            rows={10}
            className="bg-gray-100 rounded-lg p-2 focus:outline-none resize-none"
            name="content"
            value={note?.content}
            onChange={handleChange}
          />
          <select
            name="openType"
            id="openType"
            className="lg:w-24 w-full self-end bg-gray-100 p-2 rounded-lg"
            onChange={handleChange}
            value={note.openType}
          >
            <option value="NONE">비공개</option>
            <option value="FOLLOW">팔로워만</option>
            <option value="ALL">전체 공개</option>
          </select>
          <input type="hidden" id="isbn" name="isbn" value={isbn!} />
        </main>
      </form>
      {openModal && (
        <ModalPortal>
          <PostModal
            onCancel={() => setOpenModal(false)}
            onOK={() => router.back()}
          >
            <h5 className="font-bold text-lg p-3">노트 작성 중</h5>
            <p>
              작성 중인 노트가 지워져요.
              <br />
              그래도 이동하시겠어요?
            </p>
          </PostModal>
        </ModalPortal>
      )}
    </section>
  );
}