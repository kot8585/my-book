"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  message: string;
};

export default function ShowMessage({ message }: Props) {
  const router = useRouter();
  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <Image
        src="/images/reading_illustration.svg"
        alt="reading illustration"
        width={200}
        height={200}
      />
      <a onClick={() => router.back()} className="cursor-pointer">
        {message}
        <span className="text-blue-700 text-sm m-1">(뒤로가기)</span>
      </a>
    </div>
  );
}
