import ErrorFallBack from "@/components/common/ErrorFallback";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import QueryErrorBoundary from "@/components/common/QueryErrorBoundary";
import PostDetail from "@/components/post/PostDetail";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function PostDetailPage() {
  return (
    <section className="lg:w-4/5 w-full h-full flex flex-col mx-auto">
      <Suspense fallback={<LoadingSpinner />}>
        <QueryErrorBoundary>
          <PostDetail />
        </QueryErrorBoundary>
      </Suspense>
    </section>
  );
}
