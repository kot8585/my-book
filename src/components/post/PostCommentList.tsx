import { CommentType } from "@/model/post";
import { formatDate } from "@/utils/formatDate";
import PostCard from "./PostCard";

type Props = {
  comments: CommentType[];
};

export default function PostCommentList({ comments }: Props) {
  return (
    <ul>
      {comments &&
        comments.map((comment) => (
          <li
            key={comment.idx}
            className="py-2 flex gap-2 border-t border-gray-300"
          >
            <div>
              <img
                src={comment.user.image}
                width={30}
                height={30}
                className="rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm">{comment.user.name}</span>
              {/* TODO: 왜 여기다가 postCard를 넣었지? */}
              <PostCard {...comment} />
              <span className="text-sm text-gray-500">
                {formatDate(comment.createdAt)}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}
