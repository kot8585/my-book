import { getAllPostList, getFollowingPostList } from "@/service/post";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { handler } from "../auth/[...nextauth]/route";

// http://localhost:3000/api/posts?feedType=${feedType}
export async function GET(req: NextRequest, res: NextResponse) {
  const feedType = req.nextUrl.searchParams.get("feedType");

  if (feedType === "FOLLOW") {
    const session: Session | null = await getServerSession(handler);
    if (!session) {
      throw new Error("로그인이 되어있지 않음");
    }
    const userIdx = session.user.idx;
    console.log("session", session);
    console.log("userIdx: " + userIdx);
    return (
      getFollowingPostList(userIdx)
        // getAllPosList()
        .then((res) => NextResponse.json(res))
        .catch((error) => {
          console.error(error);
          return new Response(JSON.stringify(error), { status: 500 });
        })
    );
  }

  return getAllPostList()
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
