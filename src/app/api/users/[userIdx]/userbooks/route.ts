import { getUserBooks } from "@/service/userbook";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { userIdx: string };
};

export async function GET(req: NextRequest, context: Context) {
  const { userIdx } = context.params;

  const status = req.nextUrl.searchParams.get("status");

  if (!status || !userIdx) {
    return new Response("Bad Request", { status: 400 });
  }

  return getUserBooks(parseInt(userIdx), status)
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
