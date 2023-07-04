"use client";

import { UserBook } from "@/model/userBook";
import { useRouter } from "next/navigation";

import HomeBookInfo from "./HomeBookInfo";
import { ReactNode } from "react";
type Props = {
  book: UserBook;
  size: "medium" | "large";
  children?: ReactNode;
};
export default function BookCard({ book, size, children }: Props) {
  const router = useRouter();
  return (
    <li
      onClick={() => {
        router.push(`/userbooks/${book.userIdx}/${book.isbn}`);
      }}
      className={`flex flex-col relative gap-1 px-3 py-1  h-36 ${
        size === "large"
          ? ""
          : "w-72 rounded-lg border border-gray-200 shadow-lg mr-3 p-1 basis-72 cursor-pointer snap-center"
      }
       flex-grow-0 flex-shrink-0 }`}
    >
      <HomeBookInfo {...book} size={size} />
      {children}
    </li>
  );
}
