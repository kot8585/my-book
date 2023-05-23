import { UserBook } from "@/model/userBook";
import { createUserBook } from "@/service/userbook";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();

  const bookInfo: UserBook = await getBookInfoFromAladin(body);

  return await createUserBook(bookInfo).then((res) => NextResponse.json(res));
}

function getBookInfoFromAladin(body: UserBook) {
  console.log("getBookInfoFromAladin 호출------", body.isbn);
  return axios
    .get(
      `http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.ALADIN_KEY}&itemIdType=ISBN&ItemId=${body.isbn}&output=js&Version=20131101`
    )
    .then((res) => {
      console.log("=====res---", res);
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
        type: "BOOK",
        comment: body?.comment,
      };
    });
}
