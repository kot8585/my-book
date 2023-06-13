import { selectUserBook } from "@/service/userbook";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { userIdx: string; isbn: string };
};

export async function GET(req: NextRequest, context: Context) {
  const { userIdx, isbn } = context.params;

  //TODO: 로그인한 애랑같은지 확인

  return selectUserBook(parseInt(userIdx), isbn)
    .then((data) => NextResponse.json(data))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
