import { Meta, StoryObj } from "@storybook/react";
import UserInfo from "./UserInfo";

const meta: Meta<typeof UserInfo> = {
  title: "components/user/UserInfo",
  component: UserInfo,
  decorators: [(Story) => <Story />],
};

export default meta;
type Story = StoryObj<typeof UserInfo>;

export const Default: Story = {
  args: {
    image:
      "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg",
    name: "문효정",
  },
};
