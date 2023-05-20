"use client";

import React from "react";
import { menu } from "./TopNav";
import { TiHome } from "react-icons/ti";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SimpleButton from "../common/SimpleButton";

export default function BottomNav() {
  const pathName = usePathname();
  const bottomMenu = [{ href: "/", text: "홈", icon: <TiHome /> }, ...menu];

  return (
    <section className="fixed bottom-0 bg-white z-10 border-t w-full">
      <nav className="flex items-center gap-2 pl-3 justify-around xl:hidden">
        {bottomMenu.map((item) => (
          <Link href={item.href} key={item.href}>
            <SimpleButton
              activeType="color"
              active={pathName === item.href}
              size="large"
            >
              <div className="flex flex-col items-center justify-center">
                {item.icon}
                <span className="text-xs">{item.text}</span>
              </div>
            </SimpleButton>
          </Link>
        ))}
      </nav>
    </section>
  );
}
