import { getIdxByEmail, getMyReactions } from "@/service/user";
import { getServerSession, Session } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  return getMyReactions(session.user.idx)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
