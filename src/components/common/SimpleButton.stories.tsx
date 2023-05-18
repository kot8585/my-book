import type { Meta, StoryObj } from "@storybook/react";
import SimpleButton, { Props } from "./SimpleButton";
import { Children } from "react";

const meta: Meta<typeof SimpleButton> = {
  title: "components/common/SimpleButton",
  component: SimpleButton,
};

export default meta;
type Story = StoryObj<typeof SimpleButton>;

const Template = (args: Props) => <SimpleButton {...args} />;

export const Default: Story = Template.bind();
Default.args = {
  children: "버튼",
};

export const LogoutButton: Story = Template.bind();
LogoutButton.args = {
  children: "로그아웃",
  size: "small",
  bgColor: "bg-secondary-color",
  color: "text-white",
};

export const LoginButton: Story = Template.bind();
LoginButton.args = {
  children: "로그인",
  size: "small",
  bgColor: "bg-secondary-color",
  color: "text-white",
};

export const HomeReadingButton: Story = Template.bind();
HomeReadingButton.args = {
  bgColor: "bg-gray-200",
  size: "small",
  children: "읽고 있는 책",
};

export const FeedTotalFollowButton: Story = Template.bind({});
FeedTotalFollowButton.args = {
  activeType: "underline",
  active: false,
  children: "전체",
};

export const FeedActiveTotalFollowButton: Story = Template.bind({});
FeedActiveTotalFollowButton.args = {
  activeType: "underline",
  active: true,
  children: "팔로우",
};
