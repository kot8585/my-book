import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get("keyword");
  let decodeKeyword;
  if (keyword) decodeKeyword = decodeURIComponent(keyword);

  const searchResult = await axios
    .get(
      `http://www.aladin.co.kr/ttb/api/ItemSearch.aspx?ttbkey=${process.env.ALADIN_KEY}&Query=${decodeKeyword}&QueryType=Keyword&MaxResults=2&start=1&SearchTarget=Book&output=js&Version=20070901`
    )
    .then((response) => {
      const data: string = response.data;
      console.log("======data::::", data);
      return data.slice(0, -1);
    })
    .then((res) => {
      //TODO: ❗️ 파싱 에러 왜 나는지 찾을것!!
      console.log("=======📱res", res);

      const result = res.replaceAll("\\'", "");
      console.log("=======🔥re", result);
      const parse = JSON.parse(result);
      console.log("======parse::::", parse);
      return parse.item?.map((item: any) => {
        return {
          title: item.title,
          isbn: item.isbn,
          imageUrl: item.cover,
          publisher: item.publisher,
          author: item.author,
        };
      });
    })
    .then((res) => {
      return NextResponse.json(res);
    })
    .catch((error) => console.error(error));

  return searchResult;
}
