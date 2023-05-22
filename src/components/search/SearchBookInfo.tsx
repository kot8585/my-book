import React from "react";

export default function SearchBookInfo() {
  return (
    <>
      <img
        src="https://image.aladin.co.kr/product/30609/89/coversum/k052830610_1.jpg"
        alt="책 표지"
        width={60}
        height={60}
      />
      <div className="flex flex-col">
        <span className="font-semibold">수상한 중고서점</span>
        <div className="flex-1"></div>
        <span className="text-xs text-gray-500 py-1">작가</span>
        <span className="text-xs text-gray-500">출판사</span>
      </div>
    </>
  );
}
