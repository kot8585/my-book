import { getPostReactions } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "vm";

export async function GET(_: NextRequest, context: Context) {
  return getPostReactions(parseInt(context.params.postIdx))
    .then((res) => NextResponse.json(res))
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
