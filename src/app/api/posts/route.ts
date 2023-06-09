import {
  createPost,
  getAllPostList,
  getFollowingPostList,
} from "@/service/post";
import { Session, getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

// http://localhost:3000/api/posts?feedType=${feedType}
export async function GET(req: NextRequest) {
  const feedType = req.nextUrl.searchParams.get("feedType");

  if (feedType === "FOLLOW") {
    const session: Session | null = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) {
      console.error("로그인이 되어있지 않음");
      return NextResponse.json("Authentication Error 로그인이 되어있지 않음", {
        status: 401,
      });
    } else {
      return getFollowingPostList(user.idx)
        .then((res) => NextResponse.json(res))
        .catch((error) => {
          console.error(error);
          return NextResponse.json(error, { status: 500 });
        });
    }
  }

  return getAllPostList()
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return NextResponse.json(error, { status: 500 });
    });
}

export async function POST(req: NextRequest, res: NextResponse) {
  const note = await req.json();
  // TODO: validation 처리
  // 사용자 있는지
  // 필수값 있는지
  return createPost(note)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
