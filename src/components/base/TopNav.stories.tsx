import type { Meta, StoryObj } from "@storybook/react";
import TopNav from "./TopNav";
import AuthProvider from "../../provider/AuthProvider";

const meta: Meta<typeof TopNav> = {
  title: "Components/TopNav",
  component: TopNav,
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TopNav>;

export const Default: Story = {};
