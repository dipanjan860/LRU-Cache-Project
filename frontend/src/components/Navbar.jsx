import React from "react";
import { Link } from "react-router-dom";
import { MdHistory } from "react-icons/md";

function Navbar({ toggleSearchHistory, toggleAbout }) {
  return (
    <div className="sticky top-0 z-1">
      <nav className="flex items-center justify-between bg-blue-900 px-6 py-3">
        <Link to="/" className="text-white text-3xl font-bold">
          LRU-Cache Project
        </Link>
        <button
          onClick={toggleAbout}
          className="text-white text-2xl font-semibold ml-8 cursor-pointer"
        >
          About
        </button>
        <button
          onClick={toggleSearchHistory}
          className="flex items-center gap-2 ml-auto bg-blue-700 text-xl text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-blue-600"
        >
          <MdHistory className="text-2xl" />
          Search History
        </button>
      </nav>
    </div>
  );
}

export default Navbar;
