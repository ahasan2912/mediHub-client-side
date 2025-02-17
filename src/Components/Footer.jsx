import { FaFacebook, FaGithub, FaLinkedin, FaTelegram, FaWhatsappSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-gray-300 py-10">
                <div className="md:w-[90%] mx-auto px-3 mt-24 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {/* Solutions */}
                    <div>
                        <h3 className="text-white text-xl font-semibold mb-3">Solutions</h3>
                        <ul className="space-y-2">
                            <li>Marketing</li>
                            <li>Analytics</li>
                            <li>Automation</li>
                            <li>Commerce</li>
                            <li>Insights</li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-semibold mb-3 text-xl">Company</h3>
                        <ul className="space-y-2">
                            <li>About</li>
                            <li>Blog</li>
                            <li>Jobs</li>
                            <li>Press</li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-white font-semibold mb-3 text-xl">Legal</h3>
                        <ul className="space-y-2">
                            <li>Terms of service</li>
                            <li>Privacy policy</li>
                            <li>License</li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="space-y-5">
                        <h3 className="text-white text-xl font-semibold mb-3">Subscribe to our newsletter</h3>
                        <div className="flex items-center gap-2 my-3">
                            <div><FaWhatsappSquare className="text-green-400" size={40} /></div>
                            <div><FaTelegram className="text-blue-500"size={40} /></div>
                            <div><FaGithub className="" size={40} /></div>
                            <div><FaLinkedin className="text-blue-500" size={40} /></div>
                            <div><FaFacebook className="text-blue-500" size={40} /></div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 text-gray-900 rounded-md focus:outline-none"
                            />
                            <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
            <div className="bg-gray-900 text-gray-300 pb-2">
                <p className="text-center">Copyright © {new Date().getFullYear()} - All right reserved by MediHub Medicale Store</p>
            </div>
        </div>
    );
};

export default Footer;