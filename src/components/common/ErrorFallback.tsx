"use client";

import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useRouter } from "next/navigation";

type Props = {
  error: any;
  resetErrorBoundary: (...args: any[]) => void;
};

export default function ErrorFallBack({ error, resetErrorBoundary }: Props) {
  const router = useRouter();

  const { title, content, buttonLabel, handleClick } = getErrorMessage(
    error,
    router,
    resetErrorBoundary
  );

  return (
    <div className="my-auto flex flex-col justify-center items-center gap-1">
      <h1 className="text-xl font-bold">{title}</h1>
      <span className="text-sm text-center mb-3">{content}</span>
      <button onClick={handleClick} className="bg-brand-color w-52 text-sm p-1">
        {buttonLabel}
      </button>
    </div>
  );
}

function getErrorMessage(
  error: any,
  router: AppRouterInstance,
  resetErrorBoundary: (...args: any[]) => void
) {
  const status = error?.response?.status;

  switch (status) {
    case 401:
      return {
        title: "로그인을 해주세요",
        content: (
          <span>
            로그인을 해야 <br /> 이용할 수 있는 기능입니다.
          </span>
        ),
        buttonLabel: "로그인",
        handleClick: () => router.push("/auth/signin"),
      };

    default:
      return {
        title: "에러가 발생하였습니다",
        content: (
          <span>
            반복된다면 고객센터에 <br /> 문의해주세요.
          </span>
        ),
        buttonLabel: "다시 시도",
        handleClick: () => resetErrorBoundary(),
      };
  }
}
