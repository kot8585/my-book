"use client";

import { useUserBookListQuery } from "@/hooks/useUserBookListQuery";
import BookCard from "./BookCard";

type Props = {
  status: "READING" | "TOREAD" | "COMPLETED";
  userIdx: number;
};

export default function UserBookCardList({ status, userIdx }: Props) {
  const { userbooks, isLoading, error } = useUserBookListQuery(userIdx, status);

  return (
    <ul className="flex py-2">
      {userbooks ? (
        userbooks.map((userbook) => (
          <BookCard key={userbook.isbn} book={userbook} size="medium" />
        ))
      ) : (
        <li>
          <>책을 추가해주세요</>
        </li>
      )}
    </ul>
  );
}
