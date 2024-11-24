import Link from "next/link";

const NavLink = ({ href, children }) => {
    return (
        <Link
            href={href}
            className="text-center px-4 py-2 rounded-lg text-white transition bg-gray-700 hover:bg-gray-800 dark:bg-gray-50 dark:hover:bg-gray-100 dark:text-gray-800"
        >
            {children}
        </Link>
    );
};

export default NavLink;
