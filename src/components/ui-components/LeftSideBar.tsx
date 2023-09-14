"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import { UserUiComponent } from "./RightSideBar";

import {
  BiHomeCircle,
  BiBell,
  BiEnvelope,
  BiUser,
  BiLeftArrow,
  BiLogOut,
} from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";
import { BsBookmark, BsTwitter } from "react-icons/bs";
import { useState } from "react";
import NavLink from "./NavLink";

const NAV_ITEMS = [
  {
    title: "Home",
    Icon: BiHomeCircle,
    href: "/",
  },
  {
    title: "Explore",
    Icon: HiOutlineHashtag,
    href: "/explore",
  },
  {
    title: "Notifications",
    Icon: BiBell,
    href: "/notifications",
  },
  {
    title: "Messages",
    Icon: BiEnvelope,
    href: "/messages",
  },
  {
    title: "Bookmarks",
    Icon: BsBookmark,
    href: "/bookmarks",
  },
  {
    title: "Profile",
    Icon: BiUser,
    href: "/profile",
  },
];

const LeftSideBar = () => {
  // const [isTweetModalOpen, setIsTweetModalOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const { status } = useSession();

  return (
    <div className="w-64 flex flex-col justify-between px-4 h-screen pt-4 sticky top-0">
      <div>
        <NavLink href="/" Icon={BsTwitter} isHoverEffect={false} />
        <nav className="flex flex-col gap-4 mt-8">
          {NAV_ITEMS.map(({ title, Icon, href }) => (
            <NavLink
              key={title}
              title={title}
              Icon={Icon}
              href={href}
              pathname={pathname}
            />
          ))}
          {status === "authenticated" && (
            <NavLink
              title="Log out"
              Icon={BiLogOut}
              href=""
              onClick={() => signOut()}
            />
          )}
        </nav>
        <div>
          <button
            className="bg-mainBlue text-white w-full rounded-full p-2 mt-8"
            // onClick={() => setIsTweetModalOpen(true)}
          >
            Tweet
          </button>
        </div>
      </div>
      <div className="mb-4">
        <UserUiComponent
          name="Faruk Kandemir"
          image="faruk"
          userName="@farukkand09"
          action={<></>}
        />
      </div>
    </div>
  );
};

export default LeftSideBar;
