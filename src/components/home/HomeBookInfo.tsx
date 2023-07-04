import React from "react";
import ThreeDotsButton from "../common/ThreeDotsButton";
import { formatDate } from "@/utils/formatDate";

type Props = {
  title: string;
  imageUrl: string;
  status: string;
  comment?: string | null;
  size: "medium" | "large";
  createdAt?: Date;
  startDate?: Date | null;
};

export default function HomeBookInfo({
  title,
  imageUrl,
  status,
  comment,
  startDate,
  createdAt,
  size,
}: Props) {
  return (
    <>
      <h2
        className={`font-semibold ${
          size === "large" ? "text-xl" : ""
        } line-clamp-1`}
      >
        {title}
      </h2>
      <section className="flex gap-2 text-primary-color">
        <img
          src={imageUrl}
          className="rounded-lg w-[60px] h-[90px] object-cover"
        />
        <div className="flex flex-col text-sm">
          <span>
            {status === "TOREAD"
              ? formatDate(createdAt?.toString()) + "에 등록"
              : formatDate(startDate?.toString()) + "부터 독서 시작"}
          </span>
          {comment && <span>{comment}</span>}
        </div>
      </section>
    </>
  );
}
