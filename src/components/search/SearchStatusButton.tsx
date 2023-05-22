import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

export default function SearchStatusButton() {
  return (
    <div className="flex justify-center gap-1 bg-brand-color h-8 w-28 rounded-lg overflow-hidden self-end">
      <select className="bg-inherit border-r border-gray-500 text-sm">
        <option value="TOREAD">읽고 싶은</option>
        <option value="READING">읽고 있는</option>
        <option value="DONE">다 읽은</option>
      </select>
      <button className="p-1">
        <AiOutlinePlus className="w-3 h-3" />
      </button>
    </div>
  );
}
