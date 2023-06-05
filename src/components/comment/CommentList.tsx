import { CommentType } from "@/model/post";
import { formatDate } from "@/utils/formatDate";
import PostCard from "../post/PostCard";

type Props = {
  comments: CommentType[];
};

export default function CommentList({ comments }: Props) {
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
              <PostCard idx={comment.idx} content={comment.content} />
              <span className="text-sm text-gray-500">
                {formatDate(comment.createdAt)}
              </span>
            </div>
          </li>
        ))}
    </ul>
  );
}
