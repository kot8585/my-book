import { getCommentList } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { postIdx: string };
};

export async function GET(_: NextRequest, context: Context) {
  const { postIdx } = context.params;

  return await getCommentList(parseInt(postIdx))
    .then((data) => NextResponse.json(data))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
