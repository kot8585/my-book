import SimpleButton from "@/components/common/SimpleButton";
import UserBookCardList from "@/components/home/UserBookCardList";
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
      <section>
        <SimpleButton bgColor="bg-gray-200" size="small">
          읽고 있는 책
        </SimpleButton>
        <Suspense fallback={<LoadingSpinner />}>
          <UserBookCardList status="READING" userIdx={user.idx} />
        </Suspense>
      </section>
      <section>
        <SimpleButton bgColor="bg-gray-200" size="small">
          읽고 싶은 책
        </SimpleButton>
        <Suspense fallback={<LoadingSpinner />}>
          <UserBookCardList status="TOREAD" userIdx={user.idx} />
        </Suspense>
      </section>
    </main>
  );
}
