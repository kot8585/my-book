"use client";

import { useBookMarkPostListQuery } from "@/hooks/useBookMarkPostListQuery";
import { useLikePostListQuery } from "@/hooks/useLikePostListQuery";
import useUpdateBookMarkMutation from "@/hooks/useUpdateBookMarkMutation";
import { useUpdateLikeMutation } from "@/hooks/useUpdateLikeMutation";
import { useSession } from "next-auth/react";
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegCommentDots,
  FaRegHeart,
} from "react-icons/fa";
import { toast } from "react-toastify";
import BottomCenterToast from "../common/BottomCenterToast";

type Props = {
  idx: number;
  _count: {
    likeUsers: number;
    bookmarkUsers: number;
    comments: number;
  };
  likeUsers: { userIdx: number }[];
  bookmarkUsers: { userIdx: number }[];
};

export default function ReactionButtonList({
  idx,
  _count: {
    likeUsers: likeUserCnt,
    bookmarkUsers: bookmarkUserCnt,
    comments: commentCnt,
  },
  likeUsers,
  bookmarkUsers,
}: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  const { setBookmarks } = useUpdateBookMarkMutation();
  const { setLikes } = useUpdateLikeMutation(idx);

  console.log("==========likeUsers", likeUsers, "likeUserCnt", likeUserCnt);
  const liked = !!likeUsers.find((likeUser) => likeUser.userIdx === user?.idx);
  console.log("====liked", liked);
  const bookmarked = !!bookmarkUsers.find(
    (bookmarkUser) => bookmarkUser.userIdx === user?.idx
  );

  const handleLikeClick = () => {
    if (!user) return toast.error("로그인을 해야 이용가능합니다.");
    setLikes.mutate({ postIdx: idx, liked, userIdx: user.idx });
  };

  const handleBookmarkClick = () => {
    if (!user) return toast.error("로그인을 해야 이용가능합니다.");
    setBookmarks.mutate({ postIdx: idx, bookmarked, userIdx: user.idx });
  };

  return (
    <div className="flex items-center text-gray-400 gap-2 text-sm">
      <button onClick={handleLikeClick} className="flex items-center gap-1">
        {liked ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        <span>{likeUserCnt}</span>
      </button>

      <button onClick={handleBookmarkClick} className="flex items-center gap-1">
        {bookmarked ? (
          <FaBookmark className="text-brand-color" />
        ) : (
          <FaRegBookmark />
        )}
        <span>{bookmarkUserCnt}</span>
      </button>

      <div className="flex items-center gap-1">
        <FaRegCommentDots />
        <span>{commentCnt}</span>
      </div>
      <BottomCenterToast />
    </div>
  );
}
