import React from "react";
import { ToastContainer, toast } from "react-toastify";

type Props = {
  title: string;
};

export default function BottomCenterToast({ title }: Props) {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
    />
  );
}
