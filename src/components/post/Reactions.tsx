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
  postIdx: number;
};

export default function ReactionButtonList({ postIdx }: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  const { setBookmarks } = useUpdateBookMarkMutation();
  const { setLikes } = useUpdateLikeMutation();

  const { likePosts } = useLikePostListQuery();

  const { bookmarkPosts } = useBookMarkPostListQuery();

  const liked = !!likePosts && likePosts.includes(postIdx);
  const bookmarked = !!bookmarkPosts && bookmarkPosts.includes(postIdx);

  const handleLikeClick = () => {
    if (!user) return toast.error("로그인을 해야 이용가능합니다.");
    setLikes.mutate({ postIdx, liked, userIdx: user.idx });
  };

  const handleBookmarkClick = () => {
    if (!user) return toast.error("로그인을 해야 이용가능합니다.");
    setBookmarks.mutate({ postIdx, bookmarked, userIdx: user.idx });
  };

  return (
    <div className="flex gap-2">
      <button onClick={handleLikeClick}>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </button>

      <button onClick={handleBookmarkClick}>
        {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>
      <FaRegCommentDots />
      <BottomCenterToast />
    </div>
  );
}
