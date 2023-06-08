"use client";

import { UserBook } from "@/model/userBook";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";
import { MdStickyNote2 } from "react-icons/md";
import HomeBookInfo from "./HomeBookInfo";
type Props = {
  book: UserBook;
  size: "medium" | "large";
};
export default function BookCard({ book, size }: Props) {
  const router = useRouter();
  return (
    <li
      onClick={() => router.push(`/userbooks/${book.userIdx}/${book.isbn}`)}
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
      <div className="bg-brand-color text-white rounded-full py-2 p-3 flex items-center justify-center w-fit gap-2 absolute -bottom-5 right-2">
        <FaPlay size={15} className="pl-[0.12rem]" />
        <span> | </span>

        <MdStickyNote2
          size={18}
          onClick={() => {
            router.push(
              `/posts/write?isbn=${book.isbn}&readingType=${book.type}`
            );
          }}
        />
      </div>
    </li>
  );
}
