"use client";

import { useSearchBookQuery } from "@/hooks/useSearchBookQuery";
import React from "react";
import SearchBookCard from "./SearchBookCard";
import { SearchBookType } from "@/model/userBook";

type Props = {
  keyword: string | null;
};

export default function SearchBookCardList({ keyword }: Props) {
  const { searchBookList, error } = useSearchBookQuery(keyword);
  return (
    <ul className="py-14">
      {searchBookList &&
        searchBookList.map((searchBook: SearchBookType) => (
          <SearchBookCard key={searchBook.isbn} searchBook={searchBook} />
        ))}
    </ul>
  );
}
