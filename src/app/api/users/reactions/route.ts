import { Session, getServerSession } from "next-auth";
import { handler } from "../../auth/[...nextauth]/route";
import { getIdxByEmail, getMyReactions } from "@/service/user";
import { NextResponse } from "next/server";

export async function GET() {
  // //TODO: userIDx에서 찾을 수있는지 확인
  const session: Session | null = await getServerSession(handler);
  if (!session) {
    return null;
  }
  const userIdx = await getIdxByEmail(session.user.email!);

  return getMyReactions(userIdx!)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
