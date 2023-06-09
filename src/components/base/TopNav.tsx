"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { MdPeopleAlt } from "react-icons/md";
import { TbNotes, TbListSearch } from "react-icons/tb";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import SimpleButton from "../common/SimpleButton";

export const menu = [
  {
    href: "/feed",
    text: "피드",
    icon: <MdPeopleAlt />,
  },
  // {
  //   href: "/note",
  //   text: "노트",
  //   icon: <TbNotes />,
  // },
  {
    href: "/search",
    text: "검색",
    icon: <TbListSearch />,
  },
  {
    href: "/myinfo",
    text: "내정보",
    icon: <FaUserCircle />,
  },
];

export default function TopNav() {
  const { data: session } = useSession();

  const pathName = usePathname();
  return (
    <header className="sticky top-0 bg-white z-30 border-b-2 hidden xl:block p-2">
      <div className="max-w-screen-xl flex justify-between items-center mx-auto px-3">
        <Link href="/">
          <Image src={logo} alt="투게더북" width={40} height={40} />
        </Link>
        <nav className="flex items-center gap-2 pl-3">
          {menu.map((item) => (
            <Link href={item.href} key={item.href}>
              <SimpleButton active={pathName === item.href} activeType="bold">
                {item.text}
              </SimpleButton>
            </Link>
          ))}
        </nav>
        <div className="flex-1"></div>
        <section>
          {session ? (
            <SimpleButton
              size="small"
              className="rounded-lg bg-secondary-color"
              color="text-white"
              onClick={() => signOut()}
            >
              로그아웃
            </SimpleButton>
          ) : (
            <SimpleButton
              size="small"
              color="text-white"
              className="rounded-lg bg-secondary-color"
              onClick={() => signIn()}
            >
              로그인
            </SimpleButton>
          )}
        </section>
      </div>
    </header>
  );
}
