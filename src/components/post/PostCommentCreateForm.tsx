"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import SimpleButton from "../common/SimpleButton";

export default function PostCommentCreateForm() {
  const { data: session } = useSession();
  const user = session?.user;

  //TODO: 사용자가 없다면 기본 이미지를 보여주기
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target?.value;

    setValue(val);
  };

  const handleSubmit = () => {};

  return (
    <section className="flex gap-2">
      <img src={user?.image || ""} className="w-8 h-8 rounded-full" />
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <textarea
          name="content"
          onChange={handleChange}
          ref={textAreaRef}
          className="w-full outline-none text-sm border-b resize-none p-1 my-auto focus:border-b-gray-500 focus:border-b-2 transition-colors"
          placeholder="댓글을 작성해 주세요"
          rows={1}
        />
        <div className={`self-end ${!value && "hidden"} transition`}>
          <SimpleButton type="reset" size="x-small">
            취소
          </SimpleButton>
          <SimpleButton
            type="submit"
            size="x-small"
            bgColor="bg-brand-color"
            customStyle="px-2 rounded-full mx-3 my-2"
            color="text-white"
          >
            작성
          </SimpleButton>
        </div>
      </form>
    </section>
  );
}
