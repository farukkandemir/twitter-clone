import Link from "next/link";
import { ElementType } from "react";

const NavLink = ({
  title,
  Icon,
  href,
  pathname,
  isHoverEffect = true,
  onClick,
}: {
  title?: string;
  Icon: ElementType;
  href: string;
  pathname?: string;
  isHoverEffect?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link
      onClick={onClick}
      key={title}
      href={href}
      className={`flex items-center gap-4 cursor-pointer  ${
        isHoverEffect && "hover:bg-white/20"
      } transition-all duration-300 ease rounded-full p-2  tracking-wide ${
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
  );
};

export default NavLink;
