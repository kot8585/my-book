import { UserBook } from "@/model/userBook";
import { createUserBook, getUserBooks } from "@/service/userbook";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  const session: Session | null = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    console.error("로그인이 되어있지 않음");
    return NextResponse.json("Authentication Error 로그인이 되어있지 않음", {
      status: 401,
    });
  }

  const status = req.nextUrl.searchParams.get("status");

  if (!status) {
    return NextResponse.json("Bad Request", { status: 400 });
  }

  return getUserBooks(user.idx, status)
    .then((res) => NextResponse.json(res))
    .catch((error) => NextResponse.json(error, { status: 500 }));
}

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const bookInfo: UserBook = await getBookInfoFromAladin(body);

  if (body.status === "READING") {
    bookInfo.startDate = new Date();
  }

  return await createUserBook(bookInfo).then((res) => NextResponse.json(res));
}

function getBookInfoFromAladin(body: UserBook) {
  return axios
    .get(
      `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.ALADIN_KEY}&itemIdType=ISBN&ItemId=${body.isbn}&output=js&Version=20131101`
    )
    .then((res) => {
      const items = res.data.item;

      if (!items)
        throw new Error(
          `UserBook - 알라딘 API에서 해당 isbn의 검색결과가 없음. {isbn : ${body.isbn}}`
        );

      const item = items[0];

      return {
        userIdx: body.userIdx,
        isbn: item.isbn,
        title: item.title,
        author: item.author,
        publisher: item.publisher,
        imageUrl: item.cover,
        categoryName: item.categoryName,
        totalPage: item.subInfo.itemPage,
        status: body.status,
        type: "PAPER",
        comment: body?.comment,
      };
    });
}
