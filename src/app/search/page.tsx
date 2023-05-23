"use client";

import SearchBookCard from "@/components/search/SearchBookCard";
import { SearchBookType } from "@/model/userBook";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const [text, setText] = useState("");
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!text) {
        alert("검색어를 입력해주세요");
        return;
      }
      router.push(`/search?keyword=${text}`);
    }
  };

  useEffect(() => {
    if (keyword) setText(keyword);
  }, [keyword]);
  const { data: searchBookList } = useQuery(
    ["search", "book", keyword],
    () =>
      axios
        .get(`/api/search?keyword=${encodeURIComponent(keyword!)}`)
        .then((response) => {
          return response.data;
        }),
    { enabled: !!keyword, retry: 0 }
  );

  return (
    <section className="lg:w-4/5 w-full h-full flex flex-col relative mx-auto">
      <div className="fixed lg:w-4/5 w-full border-b border-gray-200">
        <div className=" relative ">
          <BsSearch className="w-5 h-5 absolute left-3 top-5 text-gray-500" />
          <input
            className="w-full h-14 py-2 px-10 pr-5 text-lg font-semibold outline-none"
            type="search"
            placeholder="검색어를 입력해주세요"
            value={text}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
          />
        </div>
      </div>
      <ul className="py-14">
        {searchBookList &&
          searchBookList.map((searchBook: SearchBookType) => (
            <SearchBookCard key={searchBook.isbn} searchBook={searchBook} />
          ))}
      </ul>
    </section>
  );
}
