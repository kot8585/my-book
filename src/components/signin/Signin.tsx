"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import SimpleButton from "../ui/button/SimpleButton";
import { FcGoogle } from "react-icons/fc";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiKakaotalk } from "react-icons/si";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export const icons = new Map([
  // eslint-disable-next-line react/jsx-key
  ["Google", <FcGoogle size={24} />],
  // eslint-disable-next-line react/jsx-key
  [
    "Kakao",
    // eslint-disable-next-line react/jsx-key
    <SiKakaotalk
      className="text-yellow-400 bg-yellow-900 rounded-md"
      size={24}
    />,
  ],
]);

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <section className="flex flex-col">
      {Object.values(providers).map(({ name, id }) => (
        <div
          key={name}
          className="mb-5 border border-primary-color rounded-md w-56 flex justify-center"
        >
          <SimpleButton
            color="black"
            onClick={() => signIn(id, { callbackUrl })}
          >
            <div className="flex justify-center items-center gap-4">
              {icons.get(name)}
              {name} 로그인
            </div>
          </SimpleButton>
        </div>
      ))}
    </section>
  );
}
