import LoadingSpinner from "@/components/common/LoadingSpinner";
import QueryErrorBoundary from "@/components/common/QueryErrorBoundary";
import PostDetail from "@/components/post/PostDetail";
import { getPost } from "@/service/post";
import { Metadata } from "next";
import { Suspense, cache } from "react";
import notFound from "./not-found";

type Props = {
  params: {
    postIdx: string;
  };
};

const getPostDetail = cache((postIdx: string) => getPost(parseInt(postIdx)));

export default async function PostDetailPage({ params: { postIdx } }: Props) {
  const post = await getPostDetail(postIdx);

  if (!post) {
    notFound();
  }

  return (
    <section className="lg:w-4/5 w-full h-full flex flex-col mx-auto">
      <Suspense fallback={<LoadingSpinner />}>
        <QueryErrorBoundary>
          <PostDetail detailPost={post} />
        </QueryErrorBoundary>
      </Suspense>
    </section>
  );
}

export async function generateMetadata({
  params: { postIdx },
}: Props): Promise<Metadata> {
  const post = await getPostDetail(postIdx);
  return {
    title: post?.userBook?.title,
    description: post?.content,
  };
}
