"use client"; // Error components must be Client Components

import SimpleButton from "@/components/common/SimpleButton";
import { AxiosError } from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

const getErrorMessage = (status: number | undefined) => {
  switch (status) {
    case 401:
    case 402:
      return {
        title: "로그인을 해주세요",
        content: (
          <span>
            로그인을 해야 <br /> 이용할 수 있는 기능입니다.
          </span>
        ),
        buttonLabel: "로그인",
      };
    case 400:
      return {
        title: "고객센터에 문의해주세요",
        content: (
          <span>
            요청사항을 처리하는데 <br /> 실패하였습니다.
          </span>
        ),
        buttonLabel: "뒤로 가기",
      };
    case 500:
    default:
      return {
        title: "잠시 후 다시 시도해주세요",
        content: (
          <span>
            요청사항을 처리하는데 <br /> 실패하였습니다.
          </span>
        ),
        buttonLabel: "다시 시도",
      };
  }
};

export default function Error({
  error,
  reset,
}: {
  // error: Error;
  error: AxiosError;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("reset이 null이니? : ", reset);
  }, [error]);

  const status = error?.response?.status;
  const { title, content, buttonLabel } = getErrorMessage(status);

  return (
    <div className="my-auto flex flex-col justify-center items-center gap-1">
      <h1 className="text-xl font-bold">{title}</h1>
      <span className="text-sm text-center mb-3">{content}</span>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="bg-brand-color w-52 text-sm p-1"
      >
        {buttonLabel}
      </button>
    </div>
  );
}
