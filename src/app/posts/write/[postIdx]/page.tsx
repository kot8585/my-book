import LoadingSpinner from "@/components/common/LoadingSpinner";
import PostEdit from "@/components/post/PostEdit";
import { Suspense } from "react";

export default function EditPostPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PostEdit />
    </Suspense>
  );
}
