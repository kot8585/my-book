"use client";

import useSearchBook from "@/hooks/searchbook";
import { SearchBookType } from "@/model/userBook";
import SearchBookCard from "./SearchBookCard";

type Props = {
  keyword: string | null;
};

export default function SearchBookCardList({ keyword }: Props) {
  const {
    useSearchBookQuery: { data: searchBookList },
  } = useSearchBook(keyword);
  return (
    <ul className="py-14">
      {searchBookList &&
        searchBookList.map((searchBook: SearchBookType) => (
          <SearchBookCard key={searchBook.isbn} searchBook={searchBook} />
        ))}
    </ul>
  );
}
