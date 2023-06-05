import React from "react";
import { ToastContainer, toast } from "react-toastify";

type Props = {
  title: string;
};

export default function BottomCenterToast() {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme="light"
    />
  );
}
