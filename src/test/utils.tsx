import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export function withQueryClient(children: ReactNode) {
  const testClient = createTestQueryClient();

  <QueryClientProvider client={testClient}>{children}</QueryClientProvider>;
}

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}
