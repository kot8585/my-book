import { SearchBookType } from "@/model/userBook";
import SearchBookInfo from "./SearchBookInfo";
import SearchStatusButton from "./SearchStatusButton";

type Props = {
  searchBook: SearchBookType;
};

export default function SearchBookCard({ searchBook }: Props) {
  return (
    <li className="flex gap-3 p-3">
      <SearchBookInfo searchBook={searchBook} />
      <div className="flex-1"></div>
      <SearchStatusButton isbn={searchBook.isbn} />
    </li>
  );
}
