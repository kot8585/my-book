import React from "react";

type Props = {
  onCancel: () => void;
  onOK: () => void;
  children: React.ReactNode;
};

export default function NoteModal({ onCancel, onOK, children }: Props) {
  return (
    <section
      className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-50 bg-neutral-500/90"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCancel();
        }
      }}
    >
      <main className="bg-white rounded-lg overflow-hidden w-72 h-40 flex flex-col text-center">
        <div className="flex-1">{children}</div>
        <div className="flex">
          <button className="flex-1 bg-gray-300 p-2" onClick={() => onCancel()}>
            취소
          </button>
          <button className="flex-1 bg-brand-color p-3" onClick={() => onOK()}>
            확인
          </button>
        </div>
      </main>
    </section>
  );
}
