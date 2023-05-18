import type { Meta, StoryObj } from "@storybook/react";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import BottomNav from "./BottomNav";

const meta: Meta<typeof BottomNav> = {
  title: "components/base/BottomNav",
  component: BottomNav,
  argTypes: {},
  // default를 모바일로 변경
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: "iphone6",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BottomNav>;

export const Default: Story = {};
