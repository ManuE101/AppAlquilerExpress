// components/NavButton.js
import Link from "next/link";

const NavButton = ({ href, children, onClick }) => {
  return (
    <Link 
      href={href} 
      className="bg-red-700 text-white text-l px-4  rounded hover:bg-red-600 transition flex items-center"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavButton;