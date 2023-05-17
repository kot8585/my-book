import type { Meta, StoryObj } from "@storybook/react";
import SimpleButton from "./SimpleButton";

const meta: Meta<typeof SimpleButton> = {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "SimpleButton",
  component: SimpleButton,
};

export default meta;
type Story = StoryObj<typeof SimpleButton>;

export const Default: Story = {
  args: {
    text: "버튼",
  },
};
