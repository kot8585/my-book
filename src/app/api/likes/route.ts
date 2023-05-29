import { createLike, deleteLike } from "@/service/likes";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  // TODO: session으로부터 userIdx 가져오기
  const { postIdx, liked } = await req.json();

  let updateLike = liked ? deleteLike : createLike;

  return updateLike(postIdx, 1)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
