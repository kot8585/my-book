import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, ChangeEvent } from "react";
import { useCreatePostMutation } from "@/hooks/useCreatePostMutation";
import { CreateNoteType } from "@/model/post";
import SimpleButton from "../common/SimpleButton";
import { toast } from "react-toastify";
import { init } from "next/dist/compiled/@vercel/og/satori";

type Props = {
  userIdx: number;
  setLoading: (loading: boolean) => void;
};

export default function PostCreateForm({ userIdx, setLoading }: Props) {
  const { createPost: addNote } = useCreatePostMutation();
  const searchParams = useSearchParams();
  //TODO: isbn과 readingType이 전해지지 않을 수가 있어,,? 이런것도 처리해줘야돼?
  const isbn = searchParams.get("isbn");
  const readingType = searchParams.get("readingType");

  let initialNote: CreateNoteType = {
    userIdx: userIdx,
    type: "NOTE",
    openType: "NONE",
    page: 0,
    content: "",
    isbn: isbn!,
  };

  const [note, setNote] = useState<CreateNoteType>(initialNote);

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>
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

    addNote.mutate(note, {
      onSuccess: () => {
        toast.info("메모가 정상적으로 작성되었습니다");
        setNote(initialNote);
      },
    });
    setLoading(false);
  };

  const handleReset = () => {
    setNote(initialNote);
  };
  return (
    <form
      className="flex  flex-col relative justify-start pt-0 gap-3"
      onSubmit={handleSubmit}
    >
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
        className="lg:w-full w-full self-end bg-gray-100 p-2 rounded-lg"
        onChange={handleChange}
        value={note.openType}
      >
        <option value="NONE">비공개</option>
        <option value="FOLLOW">팔로워만</option>
        <option value="ALL">전체 공개</option>
      </select>
      <input type="hidden" id="isbn" name="isbn" value={isbn!} />
      <div className="flex self-end gap-3">
        <SimpleButton
          type="reset"
          onClick={handleReset}
          className="rounded-lg"
          border
          size="small"
        >
          초기화
        </SimpleButton>
        <SimpleButton
          type="submit"
          onSubmit={handleSubmit}
          className="rounded-lg text-white bg-gray-500"
          size="small"
        >
          작성하기
        </SimpleButton>
      </div>
    </form>
  );
}
