import { ComponentProps, ReactNode } from "react";

export interface Props extends ComponentProps<"button"> {
  children: ReactNode;
  onClick?: () => void;
  rounded?: boolean;
  activeType?: "bold" | "color" | "underline";
  active?: boolean;
  size?: "x-small" | "small" | "middle" | "large";
  bgColor?: string;
  border?: boolean;
  color?: string;
  customStyle?: string;
}

export default function SimpleButton({
  children,
  onClick,
  rounded,
  activeType,
  active,
  size,
  bgColor,
  border,
  color,
  customStyle,
  ...rest
}: Props) {
  return (
    <button
      onClick={onClick}
      className={getContainerStyle({
        rounded,
        activeType,
        active,
        size,
        bgColor,
        border,
        color,
        customStyle,
      })}
      {...rest}
    >
      {children}
    </button>
  );
}

function getContainerStyle({
  rounded,
  activeType,
  active,
  size,
  bgColor,
  border,
  color,
  customStyle,
}: Omit<Props, "children" | "onClick">) {
  const baseStyle = "cursor-pointer";

  const bgColorStyle = bgColor ? `${bgColor}` : "";

  let activeStyle = getActiveStyle(active, activeType);

  let sizeStyle = getSizeStyle(size);

  const borderStyle = border ? "border-primary-color border " : "";

  const colorStyle = !active && color ? `${color}` : "text-primary-color";

  return `${baseStyle} ${bgColorStyle}  ${sizeStyle} ${borderStyle} ${colorStyle} ${activeStyle} ${customStyle}`;
}

function getActiveStyle(active?: boolean, activeType?: string) {
  if (!active) return "";

  if (activeType === "underline") {
    return "after:bottom-2 after:border-b-4 after:border-brand-color after:content-[''] after:block after:w-[120%] after:-mx-1";
  } else if (activeType === "bold") {
    return "font-extrabold text-secondary-color";
  } else if (activeType === "color") {
    return "text-brand-color";
  } else {
    return "";
  }
}

function getSizeStyle(size?: string): string {
  if (size === "x-small") {
    return "text-sm py-[0.3rem]";
  } else if (size === "small") {
    return "py-[0.3rem] px-2 text-base";
  } else if (size === "large") {
    return "text-[1.5rem] p-1";
  } else {
    return "p-1 text-lg mx-1";
  }
}
