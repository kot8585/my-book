import SimpleButton from "@/components/common/SimpleButton";
import HomeBookCardList from "@/components/home/HomeBookCardList";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default async function HomePage() {
  const session: Session | null = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("auth/signin");
  }

  return (
    <main className="w-full p-3 flex flex-col">
      <Suspense fallback={<LoadingSpinner />}>
        <HomeBookCardList status="READING" userIdx={user.idx} />
      </Suspense>

      <Suspense fallback={<LoadingSpinner />}>
        <HomeBookCardList status="TOREAD" userIdx={user.idx} />
      </Suspense>
    </main>
  );
}
