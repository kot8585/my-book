import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  // onClick: () => {};
  activeType?: "bold" | "color" | "underline";
  active?: boolean;
  size?: "small" | "middle" | "large";
  bgColor?: string;
  color?: string;
};

export default function SimpleButton({
  children,
  activeType,
  active,
  size,
  bgColor,
  color,
}: Props) {
  return (
    <button
      // onClick={onClick}
      className={getContainerStyle({
        activeType,
        active,
        size,
        bgColor,
        color,
      })}
    >
      {children}
    </button>
  );
}

function getContainerStyle({
  activeType,
  active,
  size,
  bgColor,
  color,
}: Omit<Props, "children">) {
  const baseStyle = "flex flex-col justify-center items-center rounded-md";
  const bgColorStyle = bgColor ? `${bgColor}` : "";

  let activeStyle = getActiveStyle(active, activeType);

  let sizeStyle = getSizeStyle(size);

  const colorStyle = color ? `${color}` : "text-primary-color";

  return `${baseStyle} ${bgColorStyle} ${activeStyle} ${sizeStyle} ${colorStyle}`;
}

function getActiveStyle(active?: boolean, activeType?: string) {
  if (!active) return "";

  if (activeType === "underline") {
    return "after:bottom-2 after:border-b-4 after:content-[''] after:block after:w-[120%] after:-mx-1";
  } else if (activeType === "bold") {
    return "font-extrabold text-secondary-color";
  } else if (activeType === "color") {
    return "text-brand-color";
  } else {
    return "";
  }
}

function getSizeStyle(size?: string): string {
  if (size === "small") {
    return "p-[0.3rem] text-base";
  } else if (size === "large") {
    return "text-[1.5rem] py-1";
  } else {
    return "p-4 text-xl";
  }
}
