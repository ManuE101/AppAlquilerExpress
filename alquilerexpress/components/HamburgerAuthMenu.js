"use client";
import { useState } from "react";
import AuthMenu from "./AuthMenu";
import Image from "next/image";

export default function HamburgerAuthMenu() {
  const [open, setOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleClick = () => {
    fetch("http://localhost:8080/user/protected", { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch(() => setLoggedIn(false));
    setOpen(!open);
  };

  return (
    <div className="relative">
      <button onClick={handleClick} className="p-2 w-8 h-8 relative">
        <Image src="/homesign.svg" alt="menu" fill />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
          <AuthMenu onClose={() => setOpen(false)} isLoggedIn={loggedIn} />
        </div>
      )}
    </div>
  );
}
