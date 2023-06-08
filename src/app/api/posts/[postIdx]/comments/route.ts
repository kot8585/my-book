import { createComment, getCommentList } from "@/service/comments";
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

export async function POST(req: NextRequest, res: NextResponse) {
  const comment = await req.json();

  // TODO: validation 처리
  // 사용자 있는지
  // 필수값 있는지
  return createComment(comment)
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
