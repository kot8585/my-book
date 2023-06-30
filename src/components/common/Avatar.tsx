import Link from "next/link";
import { useRouter } from "next/navigation";
import { BiUserCircle } from "react-icons/bi";

type AvatarSize = "small" | "medium" | "large" | "xlarge";
type Props = {
  image?: string | null;
  size?: AvatarSize;
  userIdx?: number;
};

export default function Avatar({ image, size = "small", userIdx }: Props) {
  const router = useRouter();

  const handleOnClick = () => {
    if (!userIdx) return;
    router.push(`/users/${userIdx}`);
  };

  return (
    <div onClick={handleOnClick} className={getContainerStyle(size)}>
      {/* eslint-disable-next-line @next/next/no-img-element*/}
      {image ? (
        <img
          className={`bg-white object-cover rounded-full 
        ${getImageSizeStyle(size).image}`}
          alt="user profile"
          src={image}
          referrerPolicy="no-referrer"
        />
      ) : (
        <BiUserCircle
          className={`${getImageSizeStyle(size).container} text-gray-400`}
        />
      )}
    </div>
  );
}

function getContainerStyle(size: AvatarSize): string {
  const baseStyle =
    "rounded-full flex justify-center items-center cursor-pointer";

  const { container } = getImageSizeStyle(size);
  return `${baseStyle}  ${container}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};
function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case "small":
      return {
        container: "w-9 h-9",
        image: "w-[34px] h-[34px] p-[0.1rem]",
      };
    case "medium":
      return {
        container: "w-11 h-11",
        image: "w-[42px] h-[42px] p-[0.1rem]",
      };
    case "large":
      return {
        container: "w-[68px] h-[68px]",
        image: "w-16 h-16 p-[0.2rem]",
      };

    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
