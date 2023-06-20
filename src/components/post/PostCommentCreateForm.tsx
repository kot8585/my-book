"use client";

import { useCreateCommentMutation } from "@/hooks/useCreateCommentMutation";
import { useSession } from "next-auth/react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Avatar from "../common/Avatar";
import SimpleButton from "../common/SimpleButton";
import { getErrorMessage } from "@/utils/getErrorMessage";

type Props = {
  postIdx: number;
};

export default function PostCommentCreateForm({ postIdx }: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  //TODO: 사용자가 없다면 기본 이미지를 보여주기
  const { addComment } = useCreateCommentMutation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    content: "",
  });

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!user) {
      toast.error("로그인을 해주세요");
      return;
    }
    const val = e.target?.value;

    setContent(val);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!content || !content.trim()) {
      setErrors({ content: "한글자 이상 입력해주세요" });
      return;
    }

    if (!user) {
      toast.error("로그인을 해주세요");
      return;
    }

    const comment = { postIdx, content: content.trim(), userIdx: user.idx };

    addComment.mutate(comment, {
      onSuccess: () => {
        setContent("");
      },
    });

    setLoading(false);
  };

  return (
    <section className="flex gap-2 py-2">
      <Avatar image={user?.image} />
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <textarea
          name="content"
          onChange={handleChange}
          ref={textAreaRef}
          value={content}
          className="w-full outline-none border-b resize-none p-1 my-auto focus:border-b-gray-500 focus:border-b-2 transition-colors"
          placeholder="댓글을 작성해 주세요"
          rows={1}
        />
        <div className="flex justify-between">
          <span className="text-sm text-red-500">
            {errors?.content && errors.content}
          </span>
          <div className={`${!content && "hidden"}`}>
            <SimpleButton type="reset" size="x-small" disabled={loading}>
              취소
            </SimpleButton>
            <SimpleButton
              type="submit"
              size="x-small"
              className="px-2 rounded-full mx-3 my-2 bg-brand-color"
              color="text-white"
              disabled={loading}
            >
              작성
            </SimpleButton>
          </div>
        </div>
      </form>
    </section>
  );
}
