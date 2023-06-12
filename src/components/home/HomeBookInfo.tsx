import React from "react";
import ThreeDotsButton from "../common/ThreeDotsButton";

type Props = {
  title: string;
  imageUrl: string;
  status: string;
  comment?: string | null;
  size: "medium" | "large";
};

export default function HomeBookInfo({
  title,
  imageUrl,
  status,
  comment,
  size,
}: Props) {
  return (
    <>
      <h2 className={`font-semibold ${size === "large" ? "text-xl" : ""}`}>
        {title}
      </h2>
      <section className="flex gap-2 text-primary-color">
        <img src={imageUrl} width={60} height={120} className="rounded-lg " />
        <div className="flex flex-col text-sm">
          <span>
            {/* {book.startDate
              ? book.startDate.toString()
              : book.createdAt.toString()} */}
            {status === "TOREAD"}
            2023.05.01. 부터
          </span>
          {comment && <span>{comment}</span>}
        </div>
      </section>
    </>
  );
}
