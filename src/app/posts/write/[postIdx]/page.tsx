"use client";

import Error from "@/app/error";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import PostEdit from "@/components/post/PostEdit";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function EditPostPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => (
          <Error
            error={error}
            resetErrorBoundary={resetErrorBoundary}
            notifyType="CONTAINER"
          />
        )}
      >
        <PostEdit />
      </ErrorBoundary>
    </Suspense>
  );
}
