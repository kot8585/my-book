"use client";

import BottomCenterToast from "@/components/common/BottomCenterToast";
import { ErrorType } from "@/model/error";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  error: ErrorType;
  resetErrorBoundary: () => void;
  notifyType: "CONTAINER" | "TOAST";
};

export default function Error({
  error,
  resetErrorBoundary,
  notifyType,
}: Props) {
  const router = useRouter();
  console.log(`Error: ${error}`);
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
          handleClick: () => router.push("/auth/signin"),
        };
      case 400:
        return {
          title: "잘못된 요청입니다.",
          content: (
            <span>
              에러가 반복된다면 <br /> 고객센터에 문의해주세요.
            </span>
          ),
          buttonLabel: "뒤로 가기",
          handleClick: () => router.back(),
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
          handleClick: () => resetErrorBoundary(),
        };
    }
  };

  const status = error?.response?.status;
  const { title, content, buttonLabel, handleClick } = getErrorMessage(status);

  return (
    <>
      {notifyType === "TOAST" ? (
        toast.error(title)
      ) : (
        <div className="my-auto flex flex-col justify-center items-center gap-1">
          <h1 className="text-xl font-bold">{title}</h1>
          <span className="text-sm text-center mb-3">{content}</span>
          <button
            onClick={handleClick}
            className="bg-brand-color w-52 text-sm p-1"
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </>
  );
}
