import { createFollow, deleteFollow } from "@/service/follow";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  const { following, followerIdx, followeeIdx } = await req.json();

  let updateFollow = following ? deleteFollow : createFollow;

  return updateFollow(followerIdx, followeeIdx)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
