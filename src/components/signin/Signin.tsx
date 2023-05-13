"use client";

import { ClientSafeProvider, signIn } from "next-auth/react";
import React from "react";
import SimpleButton from "../ui/button/SimpleButton";

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function Signin({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <div key={name} className="">
          <SimpleButton
            border
            color="black"
            onClick={() => signIn(id, { callbackUrl })}
          >
            {name} 로그인
          </SimpleButton>
        </div>
      ))}
    </>
  );
}
