import Image from "next/image";
import Link from "next/link";
import React from "react";
import navLogo from "@/images/navLogo.png";
const Logo = () => {
  return (
    <Link href="/">
      <span className="inline-flex items-center justify-center h-20 w-full bg-[#C4F000] hover:bg-[#C4F000] focus:bg-[#C4F000] cursor-pointer">
        <Image
          src={navLogo}
          width={0}
          height={0}
          className="w-[40px] h-[40px]"
        />
      </span>
    </Link>
  );
};

export default Logo;
