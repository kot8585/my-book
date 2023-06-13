"use client";

import { useUserBookListQuery } from "@/hooks/useUserBookListQuery";
import BookCard from "./BookCard";
import CarouselList from "../common/CarouselList";
import Link from "next/link";
import { LuBookPlus } from "react-icons/lu";
import SimpleButton from "../common/SimpleButton";
import ReadingNoteButtons from "../common/ReadingNoteButtons";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

type Props = {
  status: "READING" | "TOREAD" | "COMPLETED";
  userIdx: number;
};

export default function HomeBookCardList({ status, userIdx }: Props) {
  const pathname = usePathname().substring(1);

  const { data: session } = useSession();
  const user = session?.user;

  console.log("pathname: ", pathname);
  const { userbooks, error } = useUserBookListQuery(userIdx, status, pathname);
  console.log("userbook", userbooks);
  return (
    <section>
      <SimpleButton className="bg-gray-200  rounded-md" size="small">
        {status === "READING" ? "읽고 있는 책" : "읽고 싶은 책"}
      </SimpleButton>
      <CarouselList>
        {userbooks && userbooks.length ? (
          userbooks.map((userbook) => (
            <BookCard key={userbook.isbn} book={userbook} size="medium">
              {user?.idx === userIdx && <ReadingNoteButtons {...userbook} />}
            </BookCard>
          ))
        ) : (
          <Link href="/search">
            <div className="font-semibold pb-2">책을 추가해주세요</div>
            <LuBookPlus className="w-16 h-16 text-brand-color opacity-50 m-auto" />
          </Link>
        )}
      </CarouselList>
    </section>
  );
}
