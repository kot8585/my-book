"use client";

import { Suspense, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import QueryErrorBoundary from "../common/QueryErrorBoundary";
import SimpleButton from "../common/SimpleButton";
import FeedList from "./FeedList";

export type FeedType = "ALL" | "FOLLOW";

type HeaderMenuType = {
  type: FeedType;
  text: string;
};

const headerMenu: HeaderMenuType[] = [
  { type: "ALL", text: "전체" },
  { type: "FOLLOW", text: "팔로잉" },
];

export default function FeedTemplate() {
  const [type, setType] = useState<FeedType>("ALL");
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
      <Suspense fallback={<LoadingSpinner />}>
        <QueryErrorBoundary resetKeys={[type]}>
          <FeedList feedType={type} />
        </QueryErrorBoundary>
      </Suspense>
    </section>
  );
}
