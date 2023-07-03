import Link from "next/link";
import React from "react";

type Props = {
  idx: number;
  title?: string | null;
  content: string;
  updatedAt: Date | null;
};

export default function PostListCard({
  idx,
  title,
  content,
  updatedAt,
}: Props) {
  return (
    <Link href={`/posts/${idx}`} className="flex flex-col">
      {title && <div className="font-bold text-lg">{title}</div>}
      <span className=" whitespace-pre-line line-clamp-5">
        {content}
        {updatedAt && <span className="text-xs text-gray-400"> (수정됨)</span>}
      </span>
    </Link>
  );
}
