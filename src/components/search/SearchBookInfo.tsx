import { SearchBookType } from "@/model/userBook";
import React from "react";

type Props = {
  searchBook: SearchBookType;
};

export default function SearchBookInfo({ searchBook }: Props) {
  return (
    <>
      <img src={searchBook.imageUrl} alt="책 표지" width={60} height={60} />
      <div className="flex flex-col">
        <span className="font-semibold">{searchBook.title}</span>
        <div className="flex-1"></div>
        <span className="text-xs text-gray-500 py-1">{searchBook.author}</span>
        <span className="text-xs text-gray-500">{searchBook.publisher}</span>
      </div>
    </>
  );
}
