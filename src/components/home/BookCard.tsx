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
    <div
      onClick={() => {
        router.push(`/userbooks/${book.userIdx}/${book.isbn}`);
      }}
      className={`flex flex-col relative gap-1 px-3 py-1 w-60 h-36 
      }`}
    >
      <HomeBookInfo
        title={book.title}
        imageUrl={book.imageUrl}
        status={book.status}
        comment={book.comment}
        size={size}
      />
      {children}
    </div>
  );
}
