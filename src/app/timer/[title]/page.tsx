import PostCreate from "@/components/post/PostCreate";
import Timer from "@/components/timer/Timer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

type Props = {
  params: {
    title: string;
  };
};

export default async function timerPage({ params: { title } }: Props) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const decodeTitle = decodeURIComponent(title);

  if (!user) {
    redirect("/auth/signin");
  }
  return (
    <section className="w-full h-full">
      <h1 className="w-full text-center text-xl font-semibold pt-2 fixed z-10 bg-white p-3 border-b border-gray-300 max-w-screen-xl">
        {decodeTitle}
      </h1>
      <main className="lg:flex w-full h-full">
        <Timer />
        <section className="lg:w-1/2 lg:pt-14 pb-14 px-3">
          <PostCreate userIdx={user.idx} />
        </section>
      </main>
    </section>
  );
}
