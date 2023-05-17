import { UserBook } from "@/model/userBook";
import React from "react";
import BookCard from "./BookCard";

type Props = {
  books: UserBook[];
};

export default function BookCardList({ books }: Props) {
  return (
    <ul className="flex py-2">
      {books ? (
        books.map((book) => <BookCard key={book.isbn} book={book} />)
      ) : (
        <li>
          <>책을 추가해주세요</>
        </li>
      )}
    </ul>
  );
}
