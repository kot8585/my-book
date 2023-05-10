type Props = {
  text: string;
  // onClick: () => {};
  bold?: boolean;
  size?: "small" | "middle";
  bgColor?: string;
  color?: string;
};

export default function SimpleButton({
  text,
  bold,
  size,
  bgColor,
  color,
}: Props) {
  console.log("bold", bold);
  return (
    <button
      // onClick={onClick}
      className={`rounded-md ${bold && "font-extrabold"} ${
        size === "small" ? "p-[0.3rem] text-base" : "p-4 text-xl"
      } ${bgColor && `${bgColor}`} ${color && `${color}`}`}
    >
      {text}
    </button>
  );
}
