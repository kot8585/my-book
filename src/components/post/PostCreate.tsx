"use client";

import { ReactNode, useState } from "react";
import LoadingSpinner from "../common/LoadingSpinner";
import PostCreateForm from "./PostCreateForm";

type Props = {
  userIdx: number;
  children?: ReactNode;
};

export default function PostCreate({ userIdx, children }: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && (
        <div className="absolute inset-0 z-20 text-center  bg-yellow-100/20">
          <LoadingSpinner />
        </div>
      )}
      {children}
      <PostCreateForm userIdx={userIdx} setLoading={setLoading} />
    </>
  );
}
