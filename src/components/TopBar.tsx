"use client";

import { signOut } from "next-auth/react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function TopBar() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-500">Crickit</h1>
          </div>

          {/* Right: Social Media Icons + Sign Out Button */}
          <div className="flex items-center space-x-6">
            {/* Social Media Icons */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-all"
              aria-label="Facebook"
            >
              <FaFacebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-all"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-all"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>

            {/* Sign Out Button */}
            <button
              onClick={() => signOut()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
