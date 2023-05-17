import type { Meta, StoryObj } from "@storybook/react";
import BottomNav from "../layout/BottomNav";

const meta: Meta<typeof BottomNav> = {
  title: "Navigation/BottomNav",
  component: BottomNav,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {};
