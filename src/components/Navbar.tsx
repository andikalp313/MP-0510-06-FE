import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="text-lg font-bold text-gray-800">ExploreTik</div>
      <div className="flex justify-evenly gap-7 text-gray-600">
        <div className="hover:text-gray-900 cursor-pointer">Features</div>
        <div className="hover:text-gray-900 cursor-pointer">Industry</div>
        <div className="hover:text-gray-900 cursor-pointer">Enterprise</div>
        <div className="hover:text-gray-900 cursor-pointer">Explore Events</div>
        <div className="hover:text-gray-900 cursor-pointer">Pricing</div>
        <div className="hover:text-gray-900 cursor-pointer">Help</div>
      </div>
      <div className="flex justify-evenly gap-7 text-gray-600">
        <div className="hover:text-gray-900 cursor-pointer">Create Event</div>
        <div className="hover:text-gray-900 cursor-pointer">Login</div>
        <div className="hover:text-gray-900 cursor-pointer">Negara</div>
      </div>
    </nav>
  );
};

export default Navbar;
