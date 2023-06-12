"use client";

import { useUserBookListQuery } from "@/hooks/useUserBookListQuery";
import BookCard from "./BookCard";
import CarouselList from "../common/CarouselList";
import Link from "next/link";
import { LuBookPlus } from "react-icons/lu";
import SimpleButton from "../common/SimpleButton";

type Props = {
  status: "READING" | "TOREAD" | "COMPLETED";
  userIdx: number;
};

export default function UserBookCardList({ status, userIdx }: Props) {
  const { userbooks, error } = useUserBookListQuery(userIdx, status);

  return (
    <section>
      <SimpleButton className="bg-gray-200  rounded-md" size="small">
        {status === "READING" ? "읽고 있는 책" : "읽고 싶은 책"}
      </SimpleButton>
      <CarouselList>
        {userbooks ? (
          userbooks.map((userbook) => (
            <BookCard key={userbook.isbn} book={userbook} size="medium" />
          ))
        ) : (
          <Link
            href="/search"
            className="rounded-lg border border-gray-200 shadow-lg px-3 py-1 w-60 h-36"
          >
            <div className="font-semibold pb-2">책을 추가해주세요</div>
            <LuBookPlus className="w-16 h-16 text-brand-color opacity-50 m-auto" />
          </Link>
        )}
      </CarouselList>
    </section>
  );
}
