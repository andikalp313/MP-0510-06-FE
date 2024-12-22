"use client";

import React, { useState } from "react";
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
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Navigation = ({
  onCity,
  onCategory,
}: {
  onCity: (search: string) => void;
  onCategory: (search: string) => void;
}) => {
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

  const cities = [
    "Jakarta",
    "Surabaya",
    "Bandung",
    "Medan",
    "Yogyakarta",
    "Semarang",
    "Makassar",
    "Palembang",
    "Denpasar",
    "Balikpapan",
  ];

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    onCity(city);
  };

  const handleCategoryClick = (category: string) => {
    const selected = category === "All" ? "" : category;
    setSelectedCategory(selected);
    onCategory(category === "All" ? "" : category);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg bg-gradient-to-r p-6 shadow-md"
    >
      {/* City Dropdown */}
      <div className="mb-6">
        <label
          htmlFor="city-select"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Select a City
        </label>
        <div className="relative">
          <select
            id="city-select"
            value={selectedCity}
            onChange={handleCityChange}
            className="block w-full appearance-none rounded-full border border-gray-300 bg-white px-4 py-2 pr-8 text-sm text-gray-900 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <option value="">All Cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaMapMarkerAlt className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-2 gap-4 rounded-md sm:grid-cols-4 md:grid-cols-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge
              variant="outline"
              onClick={() => handleCategoryClick(category.name)}
              className={`flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-md transition-all duration-300 ${
                selectedCategory === category.name
                  ? "bg-sky-400 text-white"
                  : "bg-white text-gray-700 hover:bg-sky-200"
              }`}
            >
              <div className="mb-2 text-3xl">{category.icon}</div>
              <span className="text-xs font-semibold">{category.name}</span>
            </Badge>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Navigation;
