import SimpleButton from "@/components/common/SimpleButton";
import BookCardList from "@/components/home/BookCardList";
import { getUserBooks } from "@/service/userbook";
import { Session, getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { handler } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session: Session | null = await getServerSession(handler);
  const user = session?.user;

  if (!user) {
    redirect("auth/signin");
  }
  const toReadBooks = await getUserBooks(user.idx, "TOREAD");
  const readingBooks = await getUserBooks(user.idx, "READING");
  return (
    <main className="w-full p-3">
      <SimpleButton bgColor="bg-gray-200" size="small">
        읽고 있는 책
      </SimpleButton>
      <BookCardList books={readingBooks} />
      <SimpleButton bgColor="bg-gray-200" size="small">
        읽고 싶은 책
      </SimpleButton>
      <BookCardList books={toReadBooks} />
    </main>
  );
}
