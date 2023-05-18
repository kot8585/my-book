const path = require("path");

module.exports = {
  core: {
    // opt-into Storybook Webpack 5
    builder: "webpack5",
  },
  stories: [
    "../src/(components|app)/**/*.mdx",
    "../src/(components|app)/*.stories.@(js|jsx|ts|tsx)",
    "../src/(components|app)/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/(components|app)/**/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-controls",
    "storybook-addon-next",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: (config) => {
    config.resolve.alias["next/navigation"] = require.resolve(
      "../src/__mocks__/next/router.js"
    );

    config.resolve.alias["@"] = path.resolve(__dirname, "../src/");
    return config;
  },
};
// export default config;
// https://storybook.js.org/addons/storybook-addon-next 이걸로 해보거나
// webpack5로 설정하는 법 알아내야돼
// 얘는 webpack4 : https://minoo.medium.com/storybook%EC%97%90%EC%84%9C-nextjs-%EC%97%90%EB%9F%AC%EA%B0%80-%EB%B0%9C%EC%83%9D%ED%95%A0-%EB%95%8C-85ec0b3662af
