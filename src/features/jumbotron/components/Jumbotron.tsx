import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

const Jumbotron = () => {
  return (
    <div className="relative flex justify-center items-center">
      <img
        src="/images/jumbotron.png"
        alt="Jumbotron"
        className="w-full h-auto"
      />
      <div className="absolute inset-0 flex justify-center items-center mt-28 mr-11">
        <div className="flex w-full max-w-sm items-center space-x-2 bg-white p-4 rounded shadow-md">
          {/* Input Location */}
          <div className="flex items-center border rounded px-3 py-2 w-full">
            <FaMapMarkerAlt className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Enter Location"
              className="flex-grow outline-none text-gray-700"
            />
          </div>
          {/* Input Search */}
          <div className="flex items-center border rounded px-3 py-2 w-full">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search Events"
              className="flex-grow outline-none text-gray-700"
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            className="bg-white border-blue-900 text-slate-900 px-4 py-2 rounded hover:bg-blue-600 "
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
