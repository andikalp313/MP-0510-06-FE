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
    <div className="my-7 flex flex-wrap items-center justify-evenly gap-6 bg-white px-6 py-4">
      {categories.map((category) => (
        <Badge
          key={category.name}
          onClick={() => onSearch(category.name === "All" ? "" : category.name)}
          className="flex transform cursor-pointer flex-col items-center rounded-lg px-4 py-2 transition-all duration-300 hover:scale-105 hover:bg-gray-100 hover:text-black"
        >
          <div className="mb-1 text-2xl">{category.icon}</div>
          <span className="text-xs font-semibold">{category.name}</span>
        </Badge>
      ))}
    </div>
  );
};

export default Navigation;
