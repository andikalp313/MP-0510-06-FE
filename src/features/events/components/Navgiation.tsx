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
    onCategory(selected);
  };

  return (
    <div className="flex justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl rounded-2xl bg-gradient-to-r from-sky-400 to-sky-500 p-6 shadow-2xl"
      >
        {/* City Dropdown */}
        <div className="mb-6">
          <label
            htmlFor="city-select"
            className="mb-2 block text-sm font-semibold text-white"
          >
            Select a City
          </label>
          <div className="relative">
            <select
              id="city-select"
              value={selectedCity}
              onChange={handleCityChange}
              className="block w-full appearance-none rounded-full border border-sky-300 bg-white px-4 py-2 pr-10 text-sm text-gray-800 transition-colors focus:border-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600"
              aria-label="Select a City"
            >
              <option value="">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-sky-700">
              <FaMapMarkerAlt className="h-5 w-5" />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4">
          <div className="hidden w-full lg:grid lg:grid-cols-4 lg:gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-grow"
              >
                <Badge
                  variant="outline"
                  onClick={() => handleCategoryClick(category.name)}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-xl p-4 shadow-md transition-transform duration-300 ${
                    selectedCategory === category.name
                      ? "scale-105 transform bg-sky-600 text-white"
                      : "bg-white text-sky-700 hover:bg-sky-100"
                  }`}
                >
                  <div className="mb-2 text-2xl">{category.icon}</div>
                  <span className="text-sm font-semibold">{category.name}</span>
                </Badge>
              </motion.div>
            ))}
          </div>

          {/* Mobile Categories */}
          <div className="hide-scrollbar flex space-x-4 overflow-x-auto pb-2 lg:hidden">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex-shrink-0"
              >
                <Badge
                  variant="outline"
                  onClick={() => handleCategoryClick(category.name)}
                  className={`flex cursor-pointer flex-col items-center justify-center rounded-full p-4 shadow-md transition-transform duration-300 ${
                    selectedCategory === category.name
                      ? "scale-105 transform bg-sky-600 text-white"
                      : "bg-white text-sky-700 hover:bg-sky-100"
                  }`}
                >
                  <div className="mb-1 text-2xl">{category.icon}</div>
                  <span className="text-xs font-semibold">{category.name}</span>
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Navigation;
