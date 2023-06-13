"use client";

import React from "react";
import SimpleButton from "./SimpleButton";
import { FaPlay } from "react-icons/fa";
import { MdStickyNote2 } from "react-icons/md";
import { useRouter } from "next/navigation";

type Props = {
  userIdx: number;
  isbn: string;
  type: string;
};

export default function ReadingNoteButtons({ userIdx, isbn, type }: Props) {
  const router = useRouter();
  return (
    <div className="bg-brand-color text-white rounded-full flex items-center justify-center absolute -bottom-5 right-2">
      <SimpleButton className="pl-2 py-2">
        <FaPlay className="w-5 h-5 text-gray-50" />
      </SimpleButton>
      <span> | </span>
      <SimpleButton
        className="pr-2 py-2"
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
          router.push(`/posts/write?isbn=${isbn}&readingType=${type}`);
        }}
      >
        <MdStickyNote2 className="w-7 h-7  text-gray-50" />
      </SimpleButton>
    </div>
  );
}
