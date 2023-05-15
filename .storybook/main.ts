import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: [
    "../src/(components|app)/**/*.mdx",
    "../src/(components|app)/*.stories.@(js|jsx|ts|tsx)",
    "../src/(components|app)/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/(components|app)/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
