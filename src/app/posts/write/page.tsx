import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PostCreate from "@/components/post/PostCreate";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function WritePostPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  return <PostCreate userIdx={user.idx} />;
}
