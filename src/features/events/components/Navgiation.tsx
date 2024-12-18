"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  FaHome,
  FaLaptopCode,
  FaBriefcase,
  FaGraduationCap,
  FaFilm,
  FaFutbol,
  FaHeartbeat,
  FaPalette,
} from "react-icons/fa";

const Navigation = ({ onSearch }: { onSearch: (search: string) => void }) => {
  const categories = [
    { name: "All", icon: <FaHome /> },
    { name: "TECHNOLOGY", icon: <FaLaptopCode /> },
    { name: "BUSINESS", icon: <FaBriefcase /> },
    { name: "EDUCATION", icon: <FaGraduationCap /> },
    { name: "ENTERTAINMENT", icon: <FaFilm /> },
    { name: "SPORTS", icon: <FaFutbol /> },
    { name: "HEALTH", icon: <FaHeartbeat /> },
    { name: "ART", icon: <FaPalette /> },
  ];

  return (
    <div className="flex flex-wrap justify-evenly gap-6 items-center px-6 py-4 bg-white my-7">
      {categories.map((category) => (
        <Badge
          key={category.name}
          onClick={() => onSearch(category.name === "All" ? "" : category.name)}
          className="cursor-pointer flex flex-col items-center text-gray-700 hover:text-black hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 px-4 py-2 rounded-lg"
        >
          <div className="text-2xl mb-1">{category.icon}</div>
          <span className="text-xs font-semibold">{category.name}</span>
        </Badge>
      ))}
    </div>
  );
};

export default Navigation;
