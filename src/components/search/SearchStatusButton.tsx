import useUserBook from "@/hooks/userbook";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  isbn: string;
};

export default function SearchStatusButton({ isbn }: Props) {
  const [bookStatus, setBookStatus] = useState("TOREAD");
  const { addUserBookMutate } = useUserBook();
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    return redirect("/auth/login");
  }

  const handleClick = async () => {
    addUserBookMutate.mutate({
      userIdx: user.idx,
      isbn: isbn,
      status: bookStatus,
    });
    // 잘 추가 되었다면 모달창 보여주고 싶은데 어디서 처리하는거지?
  };

  return (
    <>
      {addUserBookMutate.isError &&
        confirm("에러가 발생해 추가하지 못하였습니다")}
      {addUserBookMutate.isSuccess && confirm("책이 등록되었습니다.")}
      <div className="flex justify-center gap-1 bg-brand-color h-8 w-28 rounded-lg overflow-hidden self-end">
        <select
          className="bg-inherit border-r border-gray-500 text-sm"
          value={bookStatus}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setBookStatus(e.target.value)
          }
        >
          <option value="TOREAD">읽고 싶은</option>
          <option value="READING">읽고 있는</option>
          <option value="DONE">다 읽은</option>
        </select>
        <button className="p-1" onClick={handleClick}>
          <AiOutlinePlus className="w-3 h-3" />
        </button>
      </div>
    </>
  );
}
