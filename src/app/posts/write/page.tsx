import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostCreate from "@/components/post/PostCreate";
import PostCreateHeader from "@/components/post/PostCreateHeader";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function WritePostPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return (
    <section className="max-w-3xl lg:w-4/5 w-full px-3">
      <PostCreateHeader />
      <main className=" w-full py-14 mx-auto h-full">
        <PostCreate userIdx={user.idx} />
      </main>
    </section>
  );
}
