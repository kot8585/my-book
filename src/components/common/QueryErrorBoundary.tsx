"use client";

import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallBack from "./ErrorFallback";

type Props = {
  children: ReactNode;
  resetKeys?: any[];
};

export default function QueryErrorBoundary({ children, resetKeys }: Props) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          resetKeys={resetKeys}
          FallbackComponent={ErrorFallBack}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
