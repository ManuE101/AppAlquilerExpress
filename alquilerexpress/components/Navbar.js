import Link from "next/link";
import Image from "next/image";
import NavButton from "./NavButton";
import HamburguerButton from "./HamburgerButton";
import HamburgerAuthMenu from "./HamburgerAuthMenu";

export default function Navbar() {
  return (
    <div className="w-full bg-red-800 p-4 flex justify-between items-center">
      <div className="flex align-center md:relative md:w-16 md:h-16 w-10 h-auto">
        <Image alt="boca" src="/vercel.svg" width={160} height={160}></Image>
      </div>
      <HamburguerButton />
      <nav className="hidden md:flex gap-4 justify-center flex-grow text-l text-black">
        <NavButton href="/"> Home </NavButton>
        <NavButton href="/about"> About </NavButton>
        <NavButton href="/contact"> Contact </NavButton>
      </nav>
      <HamburgerAuthMenu />
    </div>
  );
}