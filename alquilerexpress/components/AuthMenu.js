import Link from "next/link";

export default function AuthMenu({ onClose }) {
    return (
        <div className="flex flex-col p-4 text-red-800 gap-2">
        <Link href="/auth/login" className="bg-white text-red-800 px-3 py-1 rounded hover:bg-gray-200">
            Login
        </Link>
        <Link href="/auth/register" className="bg-white text-red-800 px-3 py-1 rounded hover:bg-gray-200">
            Register
        </Link>
        <Link href="/auth/logout" className="bg-red-900 text-white px-3 py-1 rounded hover:bg-red-700">
            Logout
        </Link>
        </div>
    );
}
