import { FeedBookInfo } from "@/model/post";
import Image from "next/image";
import React from "react";
import { formatDate } from "@/utils/formatDate";

type Props = {
  book: FeedBookInfo;
  createdAt: Date;
};

export default function FeedBookInfo({ book, createdAt }: Props) {
  return (
    <section className="flex justify-start gap-2">
      <img src={book.imageUrl} alt="책 표지" width={30} height={60} />
      <div className="flex flex-col">
        <span className="text-sm">{book.title}</span>
        <span className="text-xs text-gray-500">{formatDate(createdAt)}</span>
        {book.publisher ?? <span>${book.publisher}</span>}
      </div>
    </section>
  );
}
