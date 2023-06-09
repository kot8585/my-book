import { PostCommentType } from "@/model/comment";
import PostCommentCard from "./PostCommentCard";

type Props = {
  comments: PostCommentType[];
  postAuthorIdx: number;
};

export default function PostCommentList({ comments, postAuthorIdx }: Props) {
  return (
    <ul className="w-full">
      {comments &&
        comments.map((comment) => (
          <PostCommentCard
            comment={comment}
            key={comment.idx}
            postAuthorIdx={postAuthorIdx}
          />
        ))}
    </ul>
  );
}
