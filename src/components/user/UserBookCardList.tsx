"use client";

import { useUserBookListQuery } from "@/hooks/useUserBookListQuery";
import { LuBookPlus } from "react-icons/lu";
import CarouselList from "../common/CarouselList";
import SimpleButton from "../common/SimpleButton";
import BookCard from "../home/BookCard";

type Props = {
  status: "READING" | "TOREAD" | "COMPLETED";
  userIdx: number;
};

export default function UserBookCardList({ status, userIdx }: Props) {
  const { userbooks, error } = useUserBookListQuery(
    userIdx,
    status,
    `/users/${userIdx}`
  );
  console.log("userbook", userbooks);
  return (
    <section>
      <SimpleButton className="bg-gray-200  rounded-md" size="small">
        {status === "READING" ? "읽고 있는 책" : "읽고 싶은 책"}
      </SimpleButton>
      <CarouselList>
        {userbooks && userbooks.length ? (
          userbooks.map((userbook) => (
            <BookCard
              key={userbook.isbn}
              book={userbook}
              size="medium"
            ></BookCard>
          ))
        ) : (
          <div>
            <div className="font-semibold pb-2">등록된 책이 없습니다</div>
            <LuBookPlus className="w-16 h-16 text-brand-color opacity-50 m-auto" />
          </div>
        )}
      </CarouselList>
    </section>
  );
}
