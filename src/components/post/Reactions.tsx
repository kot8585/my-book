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

export default function Reactions({ postIdx }: Props) {
  const { data: session } = useSession();
  const user = session?.user;

  const { setLikes, setBookmarks } = useUser();

  const {
    data: userReactions,
    isLoading,
    error,
  } = useQuery(
    ["users", "reactions"],
    (): Promise<UserReactions> =>
      axios.get("/api/users/reactions").then((res) => res.data)
  );

  // user의 likePosts에 user가 없다면 emptyIcon을 보야주고
  // 있다면 fill 아이콘을 보여준다
  const liked =
    !!userReactions &&
    !!userReactions.likePosts.find((likePost) => {
      return likePost.postIdx === postIdx;
    });

  const bookmarked =
    !!userReactions &&
    !!userReactions.bookmarkPosts.find((bookmarkPost) => {
      return bookmarkPost.postIdx === postIdx;
    });

  const handleLikeClick = () => {
    if (!user) {
      //TODO: 모달띄우기?
      console.log("로그인을 하셔야 이용가능 합니다.");
      return;
    }
    setLikes.mutate({ postIdx, liked });
  };

  const handleBookmarkClick = () => {
    if (!user) {
      //TODO: 모달띄우기?
      console.log("로그인을 하셔야 이용가능 합니다.");
      return;
    }
    setBookmarks.mutate({ postIdx, bookmarked });
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
