import SimpleButton from "@/components/common/SimpleButton";
import UserBookCardList from "@/components/home/UserBookCardList";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session: Session | null = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect("auth/signin");
  }

  return (
    <main className="w-full p-3">
      <SimpleButton bgColor="bg-gray-200" size="small">
        읽고 있는 책
      </SimpleButton>
      <UserBookCardList status="READING" userIdx={user.idx} />
      <SimpleButton bgColor="bg-gray-200" size="small">
        읽고 싶은 책
      </SimpleButton>
      <UserBookCardList status="TOREAD" userIdx={user.idx} />
    </main>
  );
}
