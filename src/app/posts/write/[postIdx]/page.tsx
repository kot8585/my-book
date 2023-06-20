import LoadingSpinner from "@/components/common/LoadingSpinner";
import QueryErrorBoundary from "@/components/common/QueryErrorBoundary";
import PostEdit from "@/components/post/PostEdit";
import { Suspense } from "react";

export default function EditPostPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <QueryErrorBoundary>
        <PostEdit />
      </QueryErrorBoundary>
    </Suspense>
  );
}
