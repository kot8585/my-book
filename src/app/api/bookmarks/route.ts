import { createBookMark, deleteBookmarks } from "@/service/bookmarks";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  // TODO: session으로부터 userIdx 가져오기
  const { postIdx, bookmarked } = await req.json();

  let updateBookmark = bookmarked ? deleteBookmarks : createBookMark;

  return updateBookmark(postIdx, 1)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
