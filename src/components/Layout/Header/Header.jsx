import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../API/AuthThunk";

const Header = () => {

    const { authData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(logout())
        setTimeout(() => {
            navigate("/");
        }, 400);
    };

    return (
        <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">

                    {/* LEFT: LOGO */}
                    <Link to="/resume">
                        <div className="flex items-center gap-2">
                            <div className="h-9 w-9 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                                R
                            </div>
                            <span className="text-lg font-semibold text-gray-900">
                                ResumeCraft
                            </span>
                        </div>
                    </Link>

                    {/* CENTER: NAV LINKS (DESKTOP ONLY) */}
                    <nav className="hidden md:flex items-center gap-8">
                        <a
                            href="#"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                        >
                            Features
                        </a>
                        <a
                            href="#"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                        >
                            Templates
                        </a>
                        <Link
                            to="/admin"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                        >
                            Admin
                        </Link>
                        <Link
                            to="/resume"
                            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition"
                        >
                            Resume
                        </Link>
                    </nav>

                    {/* RIGHT: ACTION BUTTONS */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* {authData && (
                            <button
                                onClick={logoutHandler}
                                className="text-slate-100 hover:bg-indigo-700 border border-[#ccc] shadow-sm shadow-[#ccc] rounded-[5px] py-[0.4rem] px-5 uppercase tracking-wide font-[600] text-[0.8rem] bg-indigo-600">
                                Logout
                            </button>
                        )} */}
                        {authData ? (
                            <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1.5 hover:bg-gray-50 transition">

                                {/* Avatar */}
                                <div className="h-9 w-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-sm">
                                    {authData.fullName?.charAt(0).toUpperCase()}
                                </div>

                                {/* User Info */}
                                <div className="hidden sm:flex flex-col leading-tight">
                                    <span className="text-sm font-medium text-gray-800">
                                        {authData.fullName}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {authData.email}
                                    </span>
                                </div>

                                {/* Logout */}
                                <button
                                    onClick={logoutHandler}
                                    className="ml-2 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium
                                    text-red-600 hover:bg-red-50 transition"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5" />
                                    </svg>
                                    Logout
                                </button>

                            </div>
                        ) : (
                            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
                                Get Started
                            </button>
                        )}
                    </div>

                    {/* MOBILE MENU ICON */}
                    <button className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                </div>
            </div>

            {/* MOBILE MENU (STATIC UI ONLY) */}
            <div className="md:hidden border-t border-gray-200 bg-white">
                <div className="px-4 py-4 space-y-3">
                    <a className="block text-sm font-medium text-gray-700">Features</a>
                    <a className="block text-sm font-medium text-gray-700">Templates</a>
                    <a className="block text-sm font-medium text-gray-700">Pricing</a>
                    <a className="block text-sm font-medium text-gray-700">About</a>

                    <div className="pt-3 border-t border-gray-200 flex gap-3">
                        <button className="flex-1 py-2 border rounded-md text-sm font-medium">
                            Logout
                        </button>
                        <button className="flex-1 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium">
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
