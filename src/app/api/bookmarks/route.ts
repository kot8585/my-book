import { createBookMark, deleteBookmarks } from "@/service/bookmarks";
import { getMyBookmarks } from "@/service/user";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session: Session | null = await getServerSession(authOptions);
  if (!session) {
    return null;
  }

  return getMyBookmarks(session.user.idx)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}

export async function PUT(req: NextRequest) {
  const { postIdx, bookmarked } = await req.json();

  let updateBookmark = bookmarked ? deleteBookmarks : createBookMark;

  return updateBookmark(postIdx, 1)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
