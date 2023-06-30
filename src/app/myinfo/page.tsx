import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import MyInfo from "@/components/myinfo/MyInfo";

export default async function MyInfoPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("auth/signin");
  }

  return (
    <section className="flex flex-col justify-start max-w-3xl px-3 py-1 mx-auto lg:w-4/5 w-full h-full">
      <MyInfo userIdx={user.idx} />
    </section>
  );
}
