import useCreateUserBookMutation from "@/hooks/useCreateUserBookMutation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {
  isbn: string;
};

export default function SearchStatusButton({ isbn }: Props) {
  const [bookStatus, setBookStatus] = useState("TOREAD");
  const { createUserBook: addUserBookMutate } = useCreateUserBookMutation();
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
    // 잘 추가 되었다면 버튼색깔 회색으로 바꾸기
    // 근데 내가 추가한 책인지 확인을 어떻게 하는지 모르겠어. react-query꺼 쓰는건가......
  };

  return (
    <>
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
