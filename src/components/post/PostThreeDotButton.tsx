"use client";

import { useDeletePostMutation } from "@/hooks/useDeletePostMutation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import ModalPortal from "../common/ModalPortal";
import CancelOkModal from "../common/CancelOkModal";
import ThreeDotsButton from "../common/ThreeDotsButton";
import { toast } from "react-toastify";

type Props = {
  postIdx: number;
  author: number | null;
};

// 삭제할때는 Modal을 보여주고, 수정할때는 post/write로 이동시켜준다.
export default function PostThreeDotButton({ postIdx, author }: Props) {
  const router = useRouter();

  const { data: session } = useSession();
  const { deletePost } = useDeletePostMutation();
  const user = session?.user;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleEdit = (postIdx: number) => {
    router.push(`/posts/write/${postIdx}`);
  };

  return (
    <>
      {author === user?.idx && (
        <ThreeDotsButton
          onEdit={() => {
            handleEdit(postIdx);
          }}
          onDelete={() => setOpenModal(true)}
        />
      )}
      {openModal && (
        <ModalPortal>
          <CancelOkModal
            onCancel={() => {
              setOpenModal(false);
            }}
            onOK={() => {
              deletePost.mutate(postIdx, {
                onSuccess: () => {
                  toast.info("정상적으로 삭제되었습니다.");
                },
                onError: () => toast.error("요청에 실패하였습니다."),
              });
              setOpenModal(false);
            }}
          >
            <h5 className="font-bold text-lg p-3">메모 삭제</h5>
            <p>메모를 정말 삭제하시겠어요?</p>
          </CancelOkModal>
        </ModalPortal>
      )}
    </>
  );
}
