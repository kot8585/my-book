"use client";

import { useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import PostCreateForm from "./PostCreateForm";
import PostCreateHeader from "./PostCreateHeader";

type Props = {
  userIdx: number;
};

export default function PostCreate({ userIdx }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <section className="relative w-full pb-14 max-w-3xl  py-1 mx-auto lg:w-4/5 h-full ">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-yellow-100/20">
          <LoadingSpinner />
        </div>
      )}
      <PostCreateHeader />
      <PostCreateForm userIdx={userIdx} setLoading={setLoading} />
    </section>
  );
}
