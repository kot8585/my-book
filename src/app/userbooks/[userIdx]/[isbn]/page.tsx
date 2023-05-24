"use client";

import ReactButtonList from "@/components/feed/ReactButtonList";
import BookCard from "@/components/home/BookCard";
import HomeBookInfo from "@/components/home/HomeBookInfo";
import PostCard from "@/components/post/PostCard";
import { UserBookDetail } from "@/model/userBook";
import { formatDate } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { useParams } from "next/navigation";
import React from "react";

export default function UserBookDetailPage() {
  const params = useParams();

  const fetchUserBookInfo: () => Promise<UserBookDetail> = async () => {
    return axios
      .get(`/api/userbooks/${params.userIdx}/${params.isbn}`)
      .then((res) => res.data);
  };
  //🚨 status랑 같이 오네... 흠....
  const { data: userBook } = useQuery(
    ["UserBooks", "Detail", params.isbn],
    fetchUserBookInfo,
    { staleTime: 24 * 60 * 60 * 1000 }
  );

  return (
    <section className="lg:w-4/5 w-full h-full flex flex-col mx-auto p-3">
      <div className="mb-5">
        {userBook && <BookCard book={userBook} size="large" />}
      </div>
      <h2 className="font-bold pt-2">작성한 노트</h2>
      <ul>
        {userBook &&
          userBook.posts &&
          userBook.posts.map((post) => (
            <li
              key={post.idx}
              className="border rounded-lg border-gray-300 p-2 my-3"
            >
              <PostCard
                idx={post.idx}
                title={post.title}
                content={post.content}
              />
              <div className="flex justify-between">
                <span className="text-sm text-gray-400">
                  {formatDate(post.createdAt)}
                </span>
                <ReactButtonList />
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
