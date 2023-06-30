import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserBookCardList from "@/components/user/UserBookCardList";
import UserFollowInfoAndButton from "@/components/user/UserFollowInfoAndButton";
import { getServerSession } from "next-auth";

type Props = { params: { userIdx: string } };

export default async function UserPage({ params: { userIdx } }: Props) {
  const session = await getServerSession(authOptions);
  const loggedUser = session?.user;
  const userIdxToNum = parseInt(userIdx);

  return (
    <main className="w-full py-3 flex flex-col px-5 gap-4">
      <UserFollowInfoAndButton userIdx={userIdxToNum} loggedUser={loggedUser} />
      <UserBookCardList status="READING" userIdx={userIdxToNum} />
      <UserBookCardList status="TOREAD" userIdx={userIdxToNum} />
    </main>
  );
}
