"use client";

import { UserBook } from "@/model/userBook";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { MdStickyNote2 } from "react-icons/md";
import HomeBookInfo from "./HomeBookInfo";
import SimpleButton from "../common/SimpleButton";
type Props = {
  book: UserBook;
  size: "medium" | "large";
};
export default function BookCard({ book, size }: Props) {
  const router = useRouter();
  return (
    <li
      onClick={(e: React.MouseEvent) => {
        if (e.target === e.currentTarget)
          router.push(`/userbooks/${book.userIdx}/${book.isbn}`);
      }}
      className={`flex flex-col relative gap-1 ${
        size === "large"
          ? ""
          : "rounded-lg border border-gray-200 shadow-lg px-3 py-1 w-60"
      }`}
    >
      <HomeBookInfo
        title={book.title}
        imageUrl={book.imageUrl}
        status={book.status}
        comment={book.comment}
        size={size}
      />
      <div className="bg-brand-color text-white rounded-full flex items-center justify-center absolute -bottom-5 right-2">
        <SimpleButton customStyle="pl-2 py-2">
          <FaPlay className="w-5 h-5 text-gray-50" />
        </SimpleButton>
        <span> | </span>
        <SimpleButton
          customStyle="pr-2 py-2"
          onClick={() => {
            router.push(
              `/posts/write?isbn=${book.isbn}&readingType=${book.type}`
            );
          }}
        >
          <MdStickyNote2 className="w-7 h-7  text-gray-50" />
        </SimpleButton>
      </div>
    </li>
  );
}
