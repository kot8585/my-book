"use client";

import React, { useState } from "react";
import SimpleButton from "../../components/ui/button/SimpleButton";
import FeedList from "@/components/feed/FeedList";

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

  return (
    <section className="max-w-xl px-3 py-1">
      <header className="">
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
      <FeedList feedType={type} />
    </section>
  );
}
