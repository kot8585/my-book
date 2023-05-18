import type { Preview } from "@storybook/react";
import "../src/app/globals.css";
import * as nextImage from "next/image";
import React from "react";
import { initialize, mswDecorator } from "msw-storybook-addon";

// MSW 초기화 함수 실행
initialize();

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => {
    return <img {...props} />;
  },
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
};

// MSW 데코레이터를 전역으로 적용
export const decorators = [mswDecorator];

export default preview;
