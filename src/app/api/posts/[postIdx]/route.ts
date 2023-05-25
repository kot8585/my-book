import { deletePost, getPost, updatePost } from "@/service/post";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { postIdx: string };
};

export async function GET(_: NextRequest, context: Context) {
  //TODO: 권한 검사해서 작성자나 관리자가 아닌경우 가져오지 못하도록
  return getPost(parseInt(context.params.postIdx)).then((data) =>
    NextResponse.json(data)
  );
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  return updatePost(body).then((data) => NextResponse.json(data));
}

export async function DELETE(_: NextRequest, context: Context) {
  return deletePost(parseInt(context.params.postIdx)).then((data) =>
    NextResponse.json(data)
  );
}
