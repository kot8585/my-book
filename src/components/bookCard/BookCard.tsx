import { UserBook } from "@/model/userBook";
import { FaPlay } from "react-icons/fa";
import { MdStickyNote2 } from "react-icons/md";
type Props = {
  book: UserBook;
};
export default function BookCard({ book }: Props) {
  return (
    <li className="flex flex-col rounded-lg border border-gray-200 shadow-lg p-3 relative gap-1">
      <h2 className=" font-semibold">{book.title}</h2>
      <section className="flex gap-2 text-primary-color">
        <img
          src={book.imageUrl}
          width={60}
          height={120}
          className="rounded-lg"
        />
        <div className="flex flex-col text-sm">
          <span>
            {/* {book.startDate
              ? book.startDate.toString()
              : book.createdAt.toString()} */}
            2023.05.01. 부터
          </span>
          <span>{book?.comment}</span>
        </div>
      </section>
      <div className="bg-brand-color text-white rounded-full py-2 p-3 flex items-center justify-center w-fit gap-2 absolute -bottom-5 right-2">
        <FaPlay size={15} className="pl-[0.12rem]" />
        <span> | </span>
        <MdStickyNote2 size={18} />
      </div>
    </li>
  );
}
