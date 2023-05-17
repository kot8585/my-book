import Link from "next/link";
import React from "react";

type Props = {
  idx: number;
  title?: string | null;
  content: string;
};

export default function PostCard({ idx, title, content }: Props) {
  return (
    <Link href={`/feed/${idx}`} className="flex flex-col">
      {title && <div className="font-bold text-lg">{title}</div>}
      <p className="line-clamp-3">{content}</p>
    </Link>
  );
}
