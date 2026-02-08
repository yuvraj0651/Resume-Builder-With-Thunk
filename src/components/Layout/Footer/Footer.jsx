const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* TOP GRID */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

                    {/* BRAND */}
                    <div>
                        <h2 className="text-xl font-bold text-indigo-600">
                            ResumeCraft
                        </h2>
                        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                            Build professional resumes effortlessly.
                            Designed for developers, designers & professionals.
                        </p>
                    </div>

                    {/* PRODUCT */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                            Product
                        </h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li className="hover:text-indigo-600 cursor-pointer">Resume Builder</li>
                            <li className="hover:text-indigo-600 cursor-pointer">Templates</li>
                            <li className="hover:text-indigo-600 cursor-pointer">PDF Export</li>
                            <li className="hover:text-indigo-600 cursor-pointer">Cover Letters</li>
                        </ul>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                            Company
                        </h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li className="hover:text-indigo-600 cursor-pointer">About Us</li>
                            <li className="hover:text-indigo-600 cursor-pointer">Careers</li>
                            <li className="hover:text-indigo-600 cursor-pointer">Blog</li>
                            <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
                        </ul>
                    </div>

                    {/* SUPPORT */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                            Support
                        </h3>
                        <ul className="mt-4 space-y-2 text-sm text-gray-600">
                            <li className="hover:text-indigo-600 cursor-pointer">Help Center</li>
                            <li className="hover:text-indigo-600 cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-indigo-600 cursor-pointer">Terms of Service</li>
                            <li className="hover:text-indigo-600 cursor-pointer">FAQs</li>
                        </ul>
                    </div>
                </div>

                {/* DIVIDER */}
                <div className="border-t border-gray-200 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} ResumeCraft. All rights reserved.
                    </p>

                    {/* SOCIALS */}
                    <div className="flex gap-4 text-gray-500">
                        <span className="hover:text-indigo-600 cursor-pointer">LinkedIn</span>
                        <span className="hover:text-indigo-600 cursor-pointer">GitHub</span>
                        <span className="hover:text-indigo-600 cursor-pointer">Twitter</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
