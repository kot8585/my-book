"use client";

import React, { useState } from "react";
import SimpleButton from "../../components/ui/button/SimpleButton";
import FeedList from "@/components/feed/FeedList";
import { useSession } from "next-auth/react";
import ShowMessage from "@/components/common/ShowMessage";

export type FeedType = "TOTAL" | "FOLLOW";

type HeaderMenuType = {
  type: FeedType;
  text: string;
};

const headerMenu: HeaderMenuType[] = [
  { type: "TOTAL", text: "전체" },
  { type: "FOLLOW", text: "팔로잉" },
];

export default function FeedPage() {
  const [type, setType] = useState<FeedType>("TOTAL");
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <section className="flex flex-col justify-start max-w-3xl px-3 py-1 mx-auto lg:w-4/5 w-full h-full">
      <header>
        {headerMenu.map((item) => (
          <SimpleButton
            key={item.type}
            onClick={() => setType(item.type)}
            activeType="underline"
            active={type === item.type}
          >
            {item.text}
          </SimpleButton>
        ))}
      </header>
      {type === "FOLLOW" && !user ? (
        <ShowMessage message="팔로잉한 유저의 피드를 보려면 로그인이 필요해요" />
      ) : (
        <FeedList feedType={type} />
      )}
    </section>
  );
}
