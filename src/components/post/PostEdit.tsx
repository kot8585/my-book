"use client";

import usePostDetailQuery from "@/hooks/usePostDetailQuery";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";
import AsyncErrorBoundary from "../common/AsyncErrorBoundary";
import LoadingSpinner from "../common/LoadingSpinner";
import PostEditForm from "./PostEditForm";

export default function PostEdit() {
  const { data: session } = useSession();
  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }

  const params = useParams();
  const { detailPost: originalPost, error } = usePostDetailQuery({
    postIdx: parseInt(params.postIdx),
  });

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section className="relative w-full">
      {loading && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-yellow-100/20">
          <LoadingSpinner />
        </div>
      )}
      <AsyncErrorBoundary errorNotifyType="TOAST">
        {originalPost && (
          <PostEditForm originalPost={originalPost} setLoading={setLoading} />
        )}
      </AsyncErrorBoundary>
    </section>
  );
}
