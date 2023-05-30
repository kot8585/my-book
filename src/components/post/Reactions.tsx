import useUser from "@/hooks/user";
import { UserReactions } from "@/model/user";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

  const { setLikes, setBookmarks } = useUser();

  const { data: likePosts } = useQuery(
    ["posts", "likePosts"],
    (): Promise<number[]> => axios.get("/api/likes").then((res) => res.data)
  );

  const {
    data: bookmarkPosts,
    isLoading,
    error,
  } = useQuery(
    ["posts", "bookmarkPosts"],
    (): Promise<number[]> => axios.get("/api/bookmarks").then((res) => res.data)
  );

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
