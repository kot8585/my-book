import Link from "next/link";
import React from "react";

type Props = {
  idx: number;
  title?: string | null;
  content: string;
  updatedAt: Date | null;
};

export default function PostContent({ idx, title, content, updatedAt }: Props) {
  return (
    <section className="flex flex-col">
      {title && <h1 className="font-bold text-lg">{title}</h1>}
      <p className=" whitespace-pre-line">
        {content}
        {updatedAt && <span className="text-xs text-gray-400"> (수정됨)</span>}
      </p>
    </section>
  );
}
