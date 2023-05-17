import React from "react";
import { MoonLoader } from "react-spinners";

export default function LoadingSpinner() {
  return (
    <div className="h-full flex justify-center items-center">
      <MoonLoader speedMultiplier={0.5} color="#ffbf00" />
    </div>
  );
}
