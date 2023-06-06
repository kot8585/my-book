"use client";

import AsyncErrorBoundary from "@/components/common/AsyncErrorBoundary";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SimpleButton from "@/components/common/SimpleButton";
import FeedList from "@/components/feed/FeedList";
import { Suspense, useState } from "react";

export type FeedType = "ALL" | "FOLLOW";

type HeaderMenuType = {
  type: FeedType;
  text: string;
};

const headerMenu: HeaderMenuType[] = [
  { type: "ALL", text: "전체" },
  { type: "FOLLOW", text: "팔로잉" },
];

export default function FeedPage() {
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
        <AsyncErrorBoundary errorNotifyType="CONTAINER" resetKeys={[type]}>
          <FeedList feedType={type} />
        </AsyncErrorBoundary>
      </Suspense>
    </section>
  );
}
