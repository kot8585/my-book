"use client";

import SimpleButton from "@/components/common/SimpleButton";
import { Post } from "@/model/post";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import React, { useState } from "react";

export default function CreateNotePage() {
  const { isbn, readingType } = useParams();

  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  const [memo, setMemo] = useState<Partial<Post>>({
    userIdx: user.idx,
    type: "MEMO",
    openType: "NONE",
    page: 0,
    content: "",
  });

  const handleClose = () => {
    //createModal
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setMemo((memo) => ({ ...memo, [name]: value }));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("===submit===", memo);
  };

  return (
    <form
      className="flex  flex-col justify-start max-w-3xl  py-1 mx-auto lg:w-4/5 w-full h-full"
      onSubmit={handleSubmit}
    >
      <header className="flex justify-between items-center fixed h-10 bg-white z-10 max-w-3xl lg:w-4/5 w-full">
        <SimpleButton onClick={handleClose}>닫기</SimpleButton>
        메모 작성
        <SimpleButton
          type="submit"
          onSubmit={handleClose}
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
            value={memo?.page}
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
          value={memo?.content}
          onChange={handleChange}
        />
        <select
          name="openType"
          id="openType"
          className="lg:w-20 w-full self-end bg-gray-100 p-2 rounded-lg"
          onChange={handleChange}
          value={memo.openType}
        >
          <option value="NONE">비공개</option>
          <option value="FOLLOW">팔로워만</option>
          <option value="NONE">전체 공개</option>
        </select>
        <input type="hidden" name="isbn" value={isbn} />
      </main>
    </form>
  );
}
