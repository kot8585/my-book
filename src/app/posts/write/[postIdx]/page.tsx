"use client";

import LoadingSpinner from "@/components/common/LoadingSpinner";
import PostEditForm from "@/components/post/PostEditForm";
import usePostDetailQuery from "@/hooks/usePostDetailQuery";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { useState } from "react";

export default function EditPostPage() {
  const { data: session } = useSession();
  const user = session?.user;
  if (!user) {
    redirect("/auth/signin");
  }

  const params = useParams();
  const {
    detailPost: originalPost,
    isLoading,
    error,
  } = usePostDetailQuery({ postIdx: parseInt(params.postIdx) });

  const [loading, setLoading] = useState<boolean>(false);

  return (
    <section className="relative w-full">
      {(isLoading || loading) && (
        <div className="absolute inset-0 z-20 text-center pt-[30%] bg-yellow-100/20">
          <LoadingSpinner />
        </div>
      )}
      {originalPost && (
        <PostEditForm originalPost={originalPost} setLoading={setLoading} />
      )}
    </section>
  );
}
