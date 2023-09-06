"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { UserUiComponent } from "./RightSideBar";

import { BiHomeCircle, BiBell, BiEnvelope, BiUser } from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";
import { BsBookmark, BsTwitter } from "react-icons/bs";

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
  const pathname = usePathname();

  return (
    <div className="w-64 flex flex-col justify-between px-4">
      <div>
        <Link href="/">
          <BsTwitter style={{ fontSize: "2rem" }} />
        </Link>
        <nav className="flex flex-col gap-4 mt-8">
          {NAV_ITEMS.map(({ title, Icon, href }) => (
            <Link
              key={title}
              href={href}
              className={`flex items-center gap-4 hover:bg-white/20 transition-all duration-300 ease rounded-full py-1 tracking-wide ${
                pathname === href ? "font-semibold" : "font-normal"
              }`}
            >
              <div>
                <Icon
                  style={{
                    fontSize: "1.75rem",
                  }}
                />
              </div>
              <div>
                <p className="text-lg">{title}</p>
              </div>
            </Link>
          ))}
        </nav>
        <div>
          <button className="bg-mainBlue text-white w-full rounded-full p-2 mt-8">
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
