"use client";

import { useDeleteCommentMutation } from "@/hooks/useDeleteCommentMutation";
import { DefaultCommentType } from "@/model/comment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CancelOkModal from "../common/CancelOkModal";
import ModalPortal from "../common/ModalPortal";
import ThreeDotsButton from "../common/ThreeDotsButton";

type Props = {
  comment: DefaultCommentType;
  handleEdit: () => void;
};

// 삭제할때는 Modal을 보여주고, 수정할때는 post/write로 이동시켜준다.
//TODO: PostThreeDotsButton이랑 합칠 수있는 방법 있는지 생각
export default function CommentThreeDotsButton({
  comment: { postIdx, userIdx, content, idx, createdAt, updatedAt },
  handleEdit,
}: Props) {
  const router = useRouter();

  const { data: session } = useSession();
  const { deleteComment } = useDeleteCommentMutation();
  const user = session?.user;
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      {userIdx === user?.idx && (
        <ThreeDotsButton
          onEdit={() => {
            handleEdit();
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
              deleteComment.mutate({ commentIdx: idx, postIdx });
              setOpenModal(false);
            }}
          >
            <h5 className="font-bold text-lg p-3">댓글 삭제</h5>
            <p>댓글을 정말 삭제하시겠어요?</p>
          </CancelOkModal>
        </ModalPortal>
      )}
    </>
  );
}
