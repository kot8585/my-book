import { useBookMarkPostListQuery } from "@/hooks/useBookMarkPostListQuery";
import { useLikePostListQuery } from "@/hooks/useLikePostListQuery";
import { useUpdateLikeMutation } from "@/hooks/useUpdateLikeMutation";
import useUpdateBookMarkMutation from "@/hooks/useUpdateBookMarkMutation";
import { useSession } from "next-auth/react";
import {
  FaBookmark,
  FaHeart,
  FaRegBookmark,
  FaRegCommentDots,
  FaRegHeart,
} from "react-icons/fa";

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
    if (!user) {
      //TODO: 모달띄우기?
      console.log("로그인을 하셔야 이용가능 합니다.");
      return;
    }
    setLikes.mutate({ postIdx, liked, userIdx: user.idx });
  };

  const handleBookmarkClick = () => {
    if (!user) {
      //TODO: 모달띄우기?
      console.log("로그인을 하셔야 이용가능 합니다.");
      return;
    }
    setBookmarks.mutate({ postIdx, bookmarked, userIdx: user.idx });
  };

  return (
    <div className="flex gap-2">
      <div onClick={handleLikeClick}>
        {liked ? <FaHeart /> : <FaRegHeart />}
      </div>

      <div onClick={handleBookmarkClick}>
        {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </div>
      <FaRegCommentDots />
    </div>
  );
}
