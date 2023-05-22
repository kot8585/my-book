import React from "react";
import { BsSearch } from "react-icons/bs";
import SearchBookInfo from "@/components/search/SearchBookInfo";
import SearchStatusButton from "@/components/search/SearchStatusButton";

export default function SearchPage() {
  const handleOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      // 백엔드에 /search/books?keyword={keyword}
      // 백엔드에서 GET 요청을 받아서 openAPI로 질의
      // ISBN, title, author, publisher를 가져온다.
      // 사용자가 + 버튼을 누르면
      // POST /userbook 으로 bookStatus, userIdx, isbn(나중에는 bookIdx), 을 보내준다.
      // ❗️ mutation 처리하기
      // 백엔드에서 요청을 받아서 다시 isbn으로 질의한다음 userbook에 추가하기
    }
  };

  return (
    <section className="lg:w-4/5 w-full h-full flex flex-col relative mx-auto">
      <div className="fixed lg:w-4/5 w-full border-b border-gray-200">
        <div className=" relative ">
          <BsSearch className="w-5 h-5 absolute left-3 top-5 text-gray-500" />
          <input
            className="w-full h-14 py-2 px-10 pr-5 text-lg font-semibold outline-none"
            type="search"
            placeholder="검색어를 입력해주세요"
            onKeyDown={handleOnKeyDown}
          />
        </div>
      </div>
      <ul className="py-14">
        <li className="flex gap-3 p-3">
          <SearchBookInfo />
          <div className="flex-1"></div>
          <SearchStatusButton />
        </li>
      </ul>
    </section>
  );
}
