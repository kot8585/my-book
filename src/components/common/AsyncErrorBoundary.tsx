"use client";

import Error from "@/app/error";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {
  children: ReactNode;
  errorNotifyType: "CONTAINER" | "TOAST";
  resetKeys?: any;
};

export default function AsyncErrorBoundary({
  children,
  errorNotifyType,
  resetKeys,
}: Props) {
  return (
    <ErrorBoundary
      resetKeys={resetKeys}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Error
          error={error}
          resetErrorBoundary={resetErrorBoundary}
          notifyType={errorNotifyType}
        />
      )}
    >
      {children}
    </ErrorBoundary>
  );
}
