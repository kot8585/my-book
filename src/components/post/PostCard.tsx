import React from "react";

type Props = {
  title?: string | null;
  content: string;
};

export default function PostCard({ title, content }: Props) {
  return (
    <section className="flex flex-col">
      {title && <div className="font-bold text-lg">{title}</div>}
      <div>{content}</div>
    </section>
  );
}
