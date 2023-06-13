import { getUserFollowCnt } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";
import { Context } from "vm";

export async function GET(_: NextRequest, context: Context) {
  return getUserFollowCnt(parseInt(context.params.userIdx))
    .then((res) => {
      return NextResponse.json(res);
    })
    .catch((error) => {
      console.error(error);
      return new Response(JSON.stringify(error), { status: 500 });
    });
}
