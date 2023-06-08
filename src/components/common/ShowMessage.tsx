import Image from "next/image";

type Props = {
  message: string;
};

export default function ShowMessage({ message }: Props) {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-5">
      <Image
        src="/images/reading_illustration.svg"
        alt="reading illustration"
        width={200}
        height={200}
      />
      {message}
    </div>
  );
}
