import React, { useState } from "react";
import SimpleButton from "../common/SimpleButton";
import { MdArrowBackIos } from "react-icons/md";
import ModalPortal from "../common/ModalPortal";
import CancelOkModal from "../common/CancelOkModal";
import { useRouter } from "next/navigation";

export default function PostCreateHeader() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const router = useRouter();
  const onClose = () => setOpenModal(true);
  return (
    <>
      <header className="flex justify-between items-center fixed h-10 bg-white z-10 max-w-3xl lg:w-4/5 w-full">
        <SimpleButton type="button" onClick={onClose}>
          <MdArrowBackIos className="w-5 h-5" />
        </SimpleButton>
        메모 작성
        <div></div>
      </header>
      {openModal && (
        <ModalPortal>
          <CancelOkModal
            onCancel={() => setOpenModal(false)}
            onOK={() => router.back()}
          >
            <h5 className="font-bold text-lg p-3">노트 작성 중</h5>
            <p>
              작성 중인 노트가 지워져요.
              <br />
              그래도 이동하시겠어요?
            </p>
          </CancelOkModal>
        </ModalPortal>
      )}
    </>
  );
}
