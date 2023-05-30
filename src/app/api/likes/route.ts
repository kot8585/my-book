import { createLike, deleteLike } from "@/service/likes";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getMyLikes } from "@/service/user";

export async function GET() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  return getMyLikes(session.user.idx)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}

export async function PUT(req: NextRequest) {
  const { postIdx, liked } = await req.json();

  let updateLike = liked ? deleteLike : createLike;

  return updateLike(postIdx, 1)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
