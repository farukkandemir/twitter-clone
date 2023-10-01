"use client";
import React from "react";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

import {
  BiHomeCircle,
  BiBell,
  BiEnvelope,
  BiUser,
  BiLogOut,
} from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";
import { BsBookmark, BsTwitter } from "react-icons/bs";
import TweetButton from "../shared/TweetButton";
import useTweetModal from "@/hooks/useTweetModal";
import { splitUsername } from "@/utils/helpers";

const NavComponent = ({
  user,
  username,
}: {
  user: string | undefined | null;
  username: string;
}) => {
  const pathname = usePathname();
  const tweetModal = useTweetModal();

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
      href: `profile/${splitUsername(username)}`,
    },
  ];

  return (
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
        {user && (
          <NavLink
            title="Log out"
            Icon={BiLogOut}
            onClick={() => signOut()}
            href=""
          />
        )}
      </nav>
      <div className="mt-8">
        <TweetButton onClick={() => tweetModal.onOpen} />
      </div>
    </div>
  );
};

export default NavComponent;
