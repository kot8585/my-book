import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserBookCardList from "@/components/home/UserBookCardList";
import UserFollowInfo from "@/components/user/UserFollowInfo";
import { getServerSession } from "next-auth";

type Props = { params: { userIdx: string } };

export default async function UserPage({ params: { userIdx } }: Props) {
  const session = await getServerSession(authOptions);
  const loggedUser = session?.user;
  const userIdxToNum = parseInt(userIdx);

  return (
    <main className="w-full py-3 flex flex-col px-5 gap-4">
      <UserFollowInfo userIdx={userIdxToNum} loggedUser={loggedUser} />
      <UserBookCardList status="READING" userIdx={userIdxToNum} />
      <UserBookCardList status="TOREAD" userIdx={userIdxToNum} />
    </main>
  );
}
