import React from "react";

import {
  FaRegCommentDots,
  FaBookmark,
  FaRegBookmark,
  FaRegHeart,
  FaHeart,
} from "react-icons/fa";

//TODO : fill이랑 nonfill 하기
export default function ReactButtonList() {
  return (
    <div className="flex gap-2">
      <FaRegHeart />
      <FaRegBookmark />
      <FaRegCommentDots />
    </div>
  );
}
