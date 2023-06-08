import { Meta, StoryObj } from "@storybook/react";
import ThreeDotsButton from "./ThreeDotsButton";

const meta: Meta<typeof ThreeDotsButton> = {
  title: "components/common/ThreeDotsButton",
  component: ThreeDotsButton,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof ThreeDotsButton>;

export const Default: Story = {};
