import AsyncErrorBoundary from "@/components/common/AsyncErrorBoundary";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PostDetail from "@/components/post/PostDetail";
import { Suspense } from "react";

export default function PostDetailPage() {
  return (
    <section className="lg:w-4/5 w-full h-full flex flex-col mx-auto">
      <Suspense fallback={<LoadingSpinner />}>
        <AsyncErrorBoundary errorNotifyType="CONTAINER">
          <PostDetail />
        </AsyncErrorBoundary>
      </Suspense>
    </section>
  );
}
