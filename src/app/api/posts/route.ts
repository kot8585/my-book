import { FeedTotalPost } from "@/model/post";
import { getPublicPostList } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log("GET", req);
  return getPublicPostList()
    .then((res) => NextResponse.json(res))
    .catch((error) => new Response(JSON.stringify(error), { status: 500 }));
}
