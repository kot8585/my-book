"use client";

import { useUserBookListQuery } from "@/hooks/useUserBookListQuery";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LuBookPlus } from "react-icons/lu";
import ReadingNoteButtons from "../common/ReadingNoteButtons";
import SimpleButton from "../common/SimpleButton";
import BookCard from "./BookCard";

type Props = {
  status: "READING" | "TOREAD" | "COMPLETED";
  userIdx: number;
};

export default function HomeBookCardList({ status, userIdx }: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  const { userbooks, error } = useUserBookListQuery(userIdx, status);
  console.log("userbook", userbooks);
  return (
    <section>
      <SimpleButton className="bg-gray-200  rounded-md" size="small">
        {status === "READING" ? "읽고 있는 책" : "읽고 싶은 책"}
      </SimpleButton>
      <ul className="flex overflow-x-scroll w-full h-44 my-3 whitespace-nowrap snap-x snap-mandatory">
        {userbooks && userbooks.length ? (
          userbooks.map((userbook) => (
            <BookCard key={userbook.isbn} book={userbook} size="medium">
              {user && <ReadingNoteButtons {...userbook} />}
            </BookCard>
          ))
        ) : (
          <Link href="/search">
            <div className="font-semibold pb-2">책을 추가해주세요</div>
            <LuBookPlus className="w-16 h-16 text-brand-color opacity-50 m-auto" />
          </Link>
        )}
      </ul>
    </section>
  );
}
