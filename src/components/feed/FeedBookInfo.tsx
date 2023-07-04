import { FeedBookInfoType } from "@/model/post";
import { timeagoFormatDate as timeAgoFormatDate } from "@/utils/formatDate";

type Props = {
  book: FeedBookInfoType | null;
  createdAt: Date;
};

export default function FeedBookInfo({ book, createdAt }: Props) {
  return (
    <section className="flex justify-start gap-2">
      <img src={book?.imageUrl} alt="책 표지" className="w-[30px] h-[60px]" />
      <div className="flex flex-col">
        <span>{book?.title}</span>
        <span className="text-xs text-gray-500">
          {timeAgoFormatDate(createdAt)}
        </span>
      </div>
    </section>
  );
}
