"use client";

import { useUserBookListQuery } from "@/hooks/useUserBookListQuery";
import BookCard from "./BookCard";
import CarouselList from "../ui/CarouselList";
import Link from "next/link";
import { LuBookPlus } from "react-icons/lu";

type Props = {
  status: "READING" | "TOREAD" | "COMPLETED";
  userIdx: number;
};

export default function UserBookCardList({ status, userIdx }: Props) {
  const { userbooks, error } = useUserBookListQuery(userIdx, status);

  return (
    <CarouselList>
      {userbooks ? (
        userbooks.map((userbook) => (
          <BookCard key={userbook.isbn} book={userbook} size="medium" />
        ))
      ) : (
        <Link href="/search">
          <li className="rounded-lg border border-gray-200 shadow-lg px-3 py-1 w-60 h-36">
            <div className="font-semibold pb-2">책을 추가해주세요</div>
            <LuBookPlus className="w-16 h-16 text-brand-color opacity-50 m-auto" />
          </li>
        </Link>
      )}
    </CarouselList>
  );
}
