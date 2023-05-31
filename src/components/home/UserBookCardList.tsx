"use client";

import { UserBook } from "@/model/userBook";
import React from "react";
import BookCard from "./BookCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
  status: "READING" | "TOREAD" | "COMPLETED";
  userIdx: number;
};

export default function UserBookCardList({ status, userIdx }: Props) {
  const { data: userbooks } = useQuery(
    ["userbooks", "list", userIdx, { filter: status }],
    (): Promise<UserBook[]> =>
      axios.get(`/api/userbooks?status=${status}`).then((res) => res.data)
  );
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
