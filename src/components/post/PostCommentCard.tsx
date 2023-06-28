import { useCreateCommentMutation } from "@/hooks/useCreateCommentMutation";
import { PostCommentType } from "@/model/comment";
import { formatDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import SimpleButton from "../common/SimpleButton";
import CommentThreeDotsButton from "./CommentThreeDotsButton";
import { useUpdateCommentMutation } from "@/hooks/useUpdateCommentMutation";
import { getErrorMessage } from "@/utils/getErrorMessage";

type Props = {
  comment: PostCommentType;
  postAuthorIdx: number | null;
};

export default function PostCommentCard({ comment, postAuthorIdx }: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }
  const [textAreaDisabled, setTextAreaDisabled] = useState(true);

  const { updateComment } = useUpdateCommentMutation();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState(comment.content);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    content: "",
  });
  const originalContent = comment.content;

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
      if (!textAreaDisabled) {
        textAreaRef.current.focus();
        textAreaRef.current.selectionStart = content.length;
      }
    }
  }, [textAreaRef, content, textAreaDisabled]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target?.value;

    setContent(val);
  };

  const handleSubmit = (e: FormEvent) => {
    console.log("왜 실행이 되지?");
    e.preventDefault();
    setLoading(true);
    const editContent = content.trim();
    if (!editContent) {
      setErrors({ content: "한글자 이상 입력해주세요" });
      return;
    }

    if (originalContent === editContent) {
      toast.info("변경된 내용이 없습니다");
      setTextAreaDisabled(true);
      return;
    }

    const editComment = {
      postIdx: comment.postIdx,
      content,
      userIdx: user.idx,
      idx: comment.idx,
    };

    updateComment.mutate(editComment, {
      onSuccess: () => {
        setTextAreaDisabled(true);
      },
      onError(error, variables, context) {
        console.error("PostCommentCard Error: ", error);
        toast.error(getErrorMessage(error, "댓글 작성에 실패하였습니다."));
      },
    });

    setLoading(false);
  };

  return (
    <li
      key={comment.idx}
      className="py-2 flex gap-2 border-t border-gray-300 w-full"
    >
      <img src={comment.user?.image || ""} className="w-7 h-7 rounded-full" />
      <form className="flex flex-col w-full" onSubmit={handleSubmit}>
        <div className="flex items-center text-gray-500 w-full">
          <span className="text-xs">{comment.user?.name}</span>
          <span>﹒</span>
          <span className="text-xs">{formatDate(comment.createdAt)}</span>
          {comment.userIdx === postAuthorIdx && (
            <span className="rounded-xl bg-gray-200 px-1 text-xs ml-2">
              작성자
            </span>
          )}
          <span className="flex-1"></span>
          <CommentThreeDotsButton
            comment={comment}
            handleEdit={() => setTextAreaDisabled(false)}
          />
        </div>
        <div>
          <textarea
            name="content"
            onChange={handleChange}
            ref={textAreaRef}
            value={content}
            disabled={textAreaDisabled}
            className="w-full outline-none disabled:not:border-b resize-none my-auto focus:border-b-gray-500 focus:border-b-2 transition-colors disabled:bg-inherit "
            placeholder="댓글을 작성해 주세요"
            rows={1}
          />
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-red-500">
            {errors?.content && errors.content}
          </span>
          <div className={`${textAreaDisabled && "hidden"}`}>
            <SimpleButton
              type="reset"
              size="x-small"
              disabled={loading}
              onClick={() => {
                setContent(originalContent);
                setTextAreaDisabled(true);
              }}
            >
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
    </li>
  );
}
