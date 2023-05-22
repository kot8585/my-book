"use client";

//TODO: https://nakta.dev/how-to-manage-modals-1 참곻서 modal 개선해보기
import React from "react";
import reactDom from "react-dom";

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  if (typeof window === "undefined") {
    return null;
  }

  const node = document.getElementById("portal") as Element;

  return reactDom.createPortal(children, node);
}
