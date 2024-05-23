"use client";

import useFollow from "@/hooks/follow";
import { signOut } from "next-auth/react";
import { toast } from "react-toastify";
import SimpleButton from "../common/SimpleButton";
import UserFollowInfo from "../user/UserFollowInfo";

type Props = {
  userIdx: number;
};

export default function MyInfo({ userIdx }: Props) {
  const {
    getFollowQuery: { data: user },
  } = useFollow(userIdx);
  return (
    <>
      {user && (
        <section className="flex gap-2 items-center py-3">
          <UserFollowInfo user={user} />
          <SimpleButton
            size="small"
            color="text-gray-100"
            className="bg-gray-500 rounded-md"
            onClick={() =>
              toast.info("사용자 수정 기능은 아직 준비되지 않았습니다")
            }
          >
            수정하기
          </SimpleButton>
        </section>
      )}
      <section className="border text-center rounded-md">
        <button
          onClick={() => signOut()}
          className="cursor-pointer w-full py-3"
        >
          로그아웃
        </button>
      </section>
    </>
  );
}
