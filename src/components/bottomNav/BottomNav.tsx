"use client";

import React from "react";
import { menu } from "../topNav/TopNav";
import { TiHome } from "react-icons/ti";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathName = usePathname();
  const bottomMenu = [{ href: "/", text: "홈", icon: <TiHome /> }, ...menu];

  return (
    <div className="sticky bottom-0 bg-white z-10 border-t">
      <nav className="flex items-center gap-2 pl-3 justify-around xl:hidden">
        {bottomMenu.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={`flex flex-col justify-center items-center py-1 text-[1.5rem] ${
              pathName === item.href ? "text-amber-400" : "text-gray-500"
            }`}
          >
            {item.icon}
            <span className="text-[0.1rem]">{item.text}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
