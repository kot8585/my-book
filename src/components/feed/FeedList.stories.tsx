import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { rest } from "msw";
import { SessionProvider } from "next-auth/react";
import FeedList from "./FeedList";
import { listDataHandler } from "./__test__/MswHandlers";

const queryClient = new QueryClient();

const meta: Meta<typeof FeedList> = {
  title: "components/common/FeedList",
  component: FeedList,
  decorators: [
    (Story) => (
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
          <Story />
        </QueryClientProvider>
      </SessionProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FeedList>;

export const Default: Story = {
  args: {
    feedType: "ALL",
  },
  parameters: {
    msw: {
      handlers: listDataHandler,
    },
  },
};
