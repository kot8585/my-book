"use client";

import { ToastContainer } from "react-toastify";

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
