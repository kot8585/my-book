import React, { useState } from "react";
import { BsThreeDots, BsTrash } from "react-icons/bs";
import { HiOutlinePencilAlt } from "react-icons/hi";
import SimpleButton from "./SimpleButton";

type Props = {
  onEdit: () => void;
  onDelete: () => void;
};

// 버튼이 클릭되면 dropDownMenu를 보여준다.
export default function ThreeDotsButton({ onEdit, onDelete }: Props) {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="relative text-end">
      <button onClick={() => setClicked(!clicked)} type="button">
        <BsThreeDots className="text-gray-400 h-4 w-7" />
      </button>
      {clicked && (
        <div className="absolute flex flex-col w-28 top-5 right-0 bg-gray-100 z-50 rounded-lg">
          <SimpleButton
            color="text-black"
            size="x-small"
            onClick={() => {
              onEdit();
              setClicked(false);
            }}
            type="button"
          >
            <div className="flex items-center justify-center gap-1">
              <HiOutlinePencilAlt />
              수정하기
            </div>
          </SimpleButton>
          <hr />
          <SimpleButton
            onClick={onDelete}
            color="text-red-400"
            size="x-small"
            type="button"
          >
            <div className="flex items-center justify-center gap-1">
              <BsTrash />
              삭제하기
            </div>
          </SimpleButton>
        </div>
      )}
    </div>
  );
}
