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
};

export default function ReactionButtonList({
  idx,
  _count: { likeUsers, bookmarkUsers, comments },
}: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  const { setBookmarks } = useUpdateBookMarkMutation();
  const { setLikes } = useUpdateLikeMutation();

  const { likePosts } = useLikePostListQuery();

  const { bookmarkPosts } = useBookMarkPostListQuery();

  const liked = !!likePosts && likePosts.includes(idx);
  const bookmarked = !!bookmarkPosts && bookmarkPosts.includes(idx);

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
        <span>{likeUsers}</span>
      </button>

      <button onClick={handleBookmarkClick} className="flex items-center gap-1">
        {bookmarked ? (
          <FaBookmark className="text-brand-color" />
        ) : (
          <FaRegBookmark />
        )}
        <span>{bookmarkUsers}</span>
      </button>

      <div className="flex items-center gap-1">
        <FaRegCommentDots />
        <span>{comments}</span>
      </div>
      <BottomCenterToast />
    </div>
  );
}
