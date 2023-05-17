import React from "react";

type Props = {
  image?: string;
  name: string;
};

//TODO: image없을 경우 기본 이미지 보여주기
export default function UserInfo({ image, name }: Props) {
  return (
    <div className="flex justify-start gap-2 items-center">
      <img src={image} width={25} height={25} className="rounded-full" />
      <span className="text-xs text-gray-400">{name}</span>
    </div>
  );
}
