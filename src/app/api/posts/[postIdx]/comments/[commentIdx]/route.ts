import { deleteComment, updateComment } from "@/service/comments";
import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: { commentIdx: string };
};

export async function PUT(req: NextRequest) {
  //TODO: 권한 검사해서 작성자나 관리자가 아닌경우 실행하지 못하도록
  const body = await req.json();
  return updateComment(body).then((data) => NextResponse.json(data));
}

export async function DELETE(_: NextRequest, context: Context) {
  //TODO: 권한 검사해서 작성자나 관리자가 아닌경우 실행하지 못하도록
  return deleteComment(parseInt(context.params.commentIdx)).then((data) =>
    NextResponse.json(data)
  );
}
